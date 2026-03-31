import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Prediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

interface PlaceDetail {
  address: string;
  city: string;
  postalCode: string;
  formattedAddress: string;
}

export function usePlacesAutocomplete() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const sessionTokenRef = useRef(crypto.randomUUID());
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const fetchPredictions = useCallback((input: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!input || input.length < 3) {
      setPredictions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("places-autocomplete", {
          body: { input, sessionToken: sessionTokenRef.current },
        });

        if (error) throw error;
        setPredictions(data?.predictions || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Autocomplete error:", err);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  const selectPlace = useCallback(async (placeId: string): Promise<PlaceDetail | null> => {
    try {
      const { data, error } = await supabase.functions.invoke("places-detail", {
        body: { placeId, sessionToken: sessionTokenRef.current },
      });

      if (error) throw error;

      // Reset session token after a selection (as per Google's billing recommendation)
      sessionTokenRef.current = crypto.randomUUID();
      setPredictions([]);
      setShowSuggestions(false);

      return data as PlaceDetail;
    } catch (err) {
      console.error("Place detail error:", err);
      return null;
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setPredictions([]);
    setShowSuggestions(false);
  }, []);

  return {
    predictions,
    isLoading,
    showSuggestions,
    fetchPredictions,
    selectPlace,
    clearSuggestions,
  };
}
