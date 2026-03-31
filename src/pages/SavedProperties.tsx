import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listings";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const SavedProperties = () => {
  const [savedListingIds, setSavedListingIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchSavedProperties();
    }
  }, [user]);

  const fetchSavedProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_properties")
        .select("listing_id")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSavedListingIds(data?.map((p) => p.listing_id) || []);
    } catch (error) {
      console.error("Error fetching saved properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const savedListings = listings.filter((listing) =>
    savedListingIds.includes(listing.id)
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="py-12">
          <div className="container">
            <p className="text-center text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Saved Properties
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Your favorited properties in one place
            </p>
          </div>

          {savedListings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                No saved properties yet
              </h2>
              <p className="mt-2 text-muted-foreground">
                Start browsing and save properties you like by clicking the heart icon.
              </p>
              <Button asChild className="mt-6">
                <Link to="/listings">Browse Properties</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavedProperties;
