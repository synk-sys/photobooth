import { Listing } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X, Bed, Bath, Square, MapPin, Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyComparisonProps {
  properties: Listing[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const PropertyComparison = ({ properties, onRemove, onClose }: PropertyComparisonProps) => {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const getPropertyType = (listing: Listing): string => {
    const title = listing.title.toLowerCase();
    if (title.includes("condo") || title.includes("loft")) return "Condo Apartment";
    if (title.includes("townhouse") || title.includes("townhome")) return "Townhouse";
    if (title.includes("semi")) return "Semi-Detached";
    if (title.includes("bungalow")) return "Bungalow";
    return "Detached";
  };

  const getPricePerSqft = (listing: Listing) => {
    return Math.round(listing.price / listing.sqft);
  };

  // Find best values for highlighting
  const lowestPrice = Math.min(...properties.map((p) => p.price));
  const mostBeds = Math.max(...properties.map((p) => p.beds));
  const mostBaths = Math.max(...properties.map((p) => p.baths));
  const largestSqft = Math.max(...properties.map((p) => p.sqft));
  const lowestPricePerSqft = Math.min(...properties.map((p) => getPricePerSqft(p)));

  const comparisonRows = [
    {
      label: "Price",
      getValue: (p: Listing) => formatPrice(p.price),
      isBest: (p: Listing) => p.price === lowestPrice,
    },
    {
      label: "Bedrooms",
      getValue: (p: Listing) => p.beds.toString(),
      isBest: (p: Listing) => p.beds === mostBeds,
    },
    {
      label: "Bathrooms",
      getValue: (p: Listing) => p.baths.toString(),
      isBest: (p: Listing) => p.baths === mostBaths,
    },
    {
      label: "Square Feet",
      getValue: (p: Listing) => p.sqft.toLocaleString(),
      isBest: (p: Listing) => p.sqft === largestSqft,
    },
    {
      label: "Price/Sqft",
      getValue: (p: Listing) => `$${getPricePerSqft(p)}`,
      isBest: (p: Listing) => getPricePerSqft(p) === lowestPricePerSqft,
    },
    {
      label: "Property Type",
      getValue: (p: Listing) => getPropertyType(p),
      isBest: () => false,
    },
    {
      label: "City",
      getValue: (p: Listing) => p.city,
      isBest: () => false,
    },
    {
      label: "Location",
      getValue: (p: Listing) => p.location,
      isBest: () => false,
    },
    {
      label: "Featured",
      getValue: (p: Listing) => (p.featured ? "Yes" : "No"),
      isBest: (p: Listing) => p.featured,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-x-0 bottom-0 z-50 bg-background border-t border-border shadow-lg max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <div>
            <h2 className="text-xl font-bold text-foreground">Compare Properties</h2>
            <p className="text-sm text-muted-foreground">
              Comparing {properties.length} properties side by side
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Comparison Table */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="min-w-max">
              {/* Property Cards Row */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))` }}>
                <div className="font-medium text-muted-foreground"></div>
                {properties.map((property) => (
                  <div key={property.id} className="relative">
                    <button
                      onClick={() => onRemove(property.id)}
                      className="absolute -top-2 -right-2 z-10 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                          {property.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {property.location}
                        </p>
                        <Link
                          to={`/property/${property.id}`}
                          className="text-xs text-primary hover:underline mt-2 inline-block"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              <div className="mt-6 space-y-0">
                {comparisonRows.map((row, index) => (
                  <div
                    key={row.label}
                    className={`grid gap-4 py-3 ${index % 2 === 0 ? "bg-muted/30" : ""}`}
                    style={{ gridTemplateColumns: `200px repeat(${properties.length}, minmax(220px, 1fr))` }}
                  >
                    <div className="font-medium text-foreground px-3">{row.label}</div>
                    {properties.map((property) => {
                      const isBest = row.isBest(property);
                      return (
                        <div
                          key={property.id}
                          className={`px-3 flex items-center gap-2 ${
                            isBest ? "text-primary font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {isBest && <Check className="h-4 w-4 text-green-600" />}
                          {row.getValue(property)}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-card">
          <Button variant="outline" onClick={onClose}>
            Close Comparison
          </Button>
          <p className="text-sm text-muted-foreground">
            <Check className="h-4 w-4 inline text-green-600 mr-1" />
            Best value highlighted in each category
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparison;
