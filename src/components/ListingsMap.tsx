import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { Listing } from "@/data/listings";
import { supabase } from "@/integrations/supabase/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google: any;
    __gmapsLoading?: boolean;
    __gmapsKey?: string;
  }
}

interface ListingsMapProps {
  listings: Listing[];
  onListingClick?: (id: string) => void;
  hoveredListingId?: string | null;
  onListingHover?: (id: string | null) => void;
}

const ListingsMap = ({ listings, onListingClick, hoveredListingId, onListingHover }: ListingsMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  // Store markers keyed by listing id
  const markersMapRef = useRef<Map<string, { marker: any; el: HTMLElement }>>(new Map());
  const [error, setError] = useState<string | null>(null);

  const listingQueries = useMemo(() => {
    return listings.map((l) => ({
      id: l.id,
      query: `${l.location}, ${l.city}, Ontario, Canada`,
      price: l.price,
    }));
  }, [listings]);

  const getMarkerHtml = useCallback((priceLabel: string, highlighted: boolean) => {
    return `<span style="
      background: ${highlighted ? "hsl(var(--foreground))" : "hsl(var(--primary))"};
      color: ${highlighted ? "hsl(var(--background))" : "hsl(var(--primary-foreground))"};
      padding: ${highlighted ? "6px 10px" : "4px 8px"};
      border-radius: 4px;
      font-size: ${highlighted ? "13px" : "12px"};
      font-weight: 600;
      white-space: nowrap;
      box-shadow: ${highlighted ? "0 4px 12px rgba(0,0,0,0.4)" : "0 2px 6px rgba(0,0,0,0.3)"};
      cursor: pointer;
      transition: all 0.15s ease;
      transform: ${highlighted ? "scale(1.1)" : "scale(1)"};
      z-index: ${highlighted ? "10" : "1"};
    ">${priceLabel}</span>`;
  }, []);

  const formatPrice = useCallback((price: number) => {
    return price >= 1000000
      ? `$${(price / 1000000).toFixed(1)}M`
      : `$${(price / 1000).toFixed(0)}K`;
  }, []);

  // Update marker styles when hoveredListingId changes
  useEffect(() => {
    markersMapRef.current.forEach(({ el }, id) => {
      const listing = listings.find((l) => l.id === id);
      if (!listing) return;
      const priceLabel = formatPrice(listing.price);
      const highlighted = hoveredListingId === id;
      el.innerHTML = getMarkerHtml(priceLabel, highlighted);
      if (highlighted) {
        (el as HTMLElement).style.zIndex = "10";
      } else {
        (el as HTMLElement).style.zIndex = "1";
      }
    });
  }, [hoveredListingId, listings, formatPrice, getMarkerHtml]);

  useEffect(() => {
    const placeMarkers = (map: any) => {
      markersMapRef.current.forEach(({ marker }) => { marker.map = null; });
      markersMapRef.current.clear();

      const geocoder = new window.google.maps.Geocoder();
      const bounds = new window.google.maps.LatLngBounds();
      let placed = 0;

      listingQueries.forEach(({ id, query, price }) => {
        geocoder.geocode({ address: query }, (results: any, status: string) => {
          placed++;
          if (status === "OK" && results?.[0]) {
            const position = results[0].geometry.location;
            bounds.extend(position);

            const priceLabel = formatPrice(price);
            const el = document.createElement("div");
            el.innerHTML = getMarkerHtml(priceLabel, false);
            el.style.position = "relative";

            // Hover events on marker
            el.addEventListener("mouseenter", () => onListingHover?.(id));
            el.addEventListener("mouseleave", () => onListingHover?.(null));

            const marker = new window.google.maps.marker.AdvancedMarkerElement({
              map,
              position,
              content: el,
            });

            marker.addListener("click", () => onListingClick?.(id));
            markersMapRef.current.set(id, { marker, el });
          }

          if (placed === listingQueries.length && markersMapRef.current.size > 0) {
            if (markersMapRef.current.size === 1) {
              const first = markersMapRef.current.values().next().value;
              map.setCenter(first.marker.position);
              map.setZoom(13);
            } else {
              map.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });
            }
          }
        });
      });
    };

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 43.7, lng: -79.4 },
          zoom: 10,
          mapId: "listings-map",
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        });
      }

      placeMarkers(mapInstanceRef.current);
    };

    const loadAndInit = async () => {
      if (window.google?.maps) {
        initMap();
        return;
      }

      if (window.__gmapsLoading) {
        const interval = setInterval(() => {
          if (window.google?.maps) {
            clearInterval(interval);
            initMap();
          }
        }, 200);
        return;
      }

      let key = window.__gmapsKey;
      if (!key) {
        try {
          const { data, error: fnError } = await supabase.functions.invoke("get-maps-key");
          if (fnError || !data?.key) {
            setError("Unable to load map");
            return;
          }
          key = data.key;
          window.__gmapsKey = key;
        } catch {
          setError("Unable to load map");
          return;
        }
      }

      window.__gmapsLoading = true;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=marker&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      script.onerror = () => setError("Failed to load Google Maps");
      document.head.appendChild(script);
    };

    loadAndInit();

    return () => {
      markersMapRef.current.forEach(({ marker }) => { marker.map = null; });
      markersMapRef.current.clear();
    };
  }, [listingQueries, onListingClick, onListingHover, formatPrice, getMarkerHtml]);

  if (error) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted rounded-lg">
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />;
};

export default ListingsMap;
