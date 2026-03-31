import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSavedProperties = () => {
  const [savedListingIds, setSavedListingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSavedProperties();
    } else {
      setSavedListingIds(new Set());
      setLoading(false);
    }
  }, [user]);

  const fetchSavedProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_properties")
        .select("listing_id");

      if (error) throw error;

      setSavedListingIds(new Set(data?.map((p) => p.listing_id) || []));
    } catch (error) {
      console.error("Error fetching saved properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = async (listingId: string) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save properties.",
        variant: "destructive",
      });
      return;
    }

    const isSaved = savedListingIds.has(listingId);

    try {
      if (isSaved) {
        const { error } = await supabase
          .from("saved_properties")
          .delete()
          .eq("listing_id", listingId)
          .eq("user_id", user.id);

        if (error) throw error;

        setSavedListingIds((prev) => {
          const next = new Set(prev);
          next.delete(listingId);
          return next;
        });

        toast({
          title: "Property removed",
          description: "Property removed from your saved list.",
        });
      } else {
        const { error } = await supabase
          .from("saved_properties")
          .insert({ listing_id: listingId, user_id: user.id });

        if (error) throw error;

        setSavedListingIds((prev) => new Set(prev).add(listingId));

        toast({
          title: "Property saved",
          description: "Property added to your saved list.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isSaved = (listingId: string) => savedListingIds.has(listingId);

  return { savedListingIds, loading, toggleSave, isSaved, isLoggedIn: !!user };
};
