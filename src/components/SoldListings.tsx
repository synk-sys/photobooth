import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bath, Bed, MapPin, Ruler, Lock } from "lucide-react";
import { soldListings } from "@/data/listings";
import { supabase } from "@/integrations/supabase/client";

const SoldListings = () => {
  const [user, setUser] = useState<any>(null);

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

  const visibleListings = user ? soldListings : soldListings.slice(0, 2);
  const hiddenCount = user ? 0 : soldListings.length - 2;

  return (
    <section className="py-16 md:py-20 bg-background section-divider">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-primary/40" />
            <p className="text-primary font-body text-sm tracking-[0.35em] uppercase font-medium">
              Track Record
            </p>
            <span className="h-px w-10 bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Recently Sold
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md mx-auto font-body text-[15px] font-light">
            See our track record of successful sales and happy homeowners
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleListings.map((listing) => (
            <div key={listing.id} className="group overflow-hidden bg-card shadow-soft hover:shadow-luxury transition-shadow duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-none font-medium">
                  Sold
                </Badge>
                {listing.soldDate && (
                  <span className="absolute top-4 right-4 text-primary-foreground/80 text-[11px] font-body tracking-wider bg-foreground/40 backdrop-blur-sm px-3 py-1">
                    {listing.soldDate}
                  </span>
                )}
                <div className="absolute bottom-4 left-5">
                  <p className="font-display text-3xl font-semibold text-primary-foreground drop-shadow-lg">
                    ${listing.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
                  {listing.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-2.5 text-sm text-muted-foreground font-light">
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  <span className="line-clamp-1">{listing.location}, {listing.city}</span>
                </div>
                <div className="my-5 h-px bg-border/60" />
                <div className="flex items-center gap-6 text-sm text-muted-foreground font-light">
                  <div className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4 text-primary/50" />
                    <span>{listing.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4 text-primary/50" />
                    <span>{listing.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Ruler className="h-4 w-4 text-primary/50" />
                    <span>{listing.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Login prompt for hidden listings */}
          {!user && hiddenCount > 0 && (
            <div className="overflow-hidden flex items-center justify-center border border-dashed border-border/40">
              <div className="p-12 text-center">
                <Lock className="h-8 w-8 mx-auto mb-6 text-muted-foreground/30" />
                <h3 className="font-display font-semibold text-2xl mb-3 text-foreground">
                  +{hiddenCount} More Sold
                </h3>
                <p className="text-sm text-muted-foreground mb-8 font-light">
                  Sign in to view all our successful sales
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 h-11 px-8 text-[11px] tracking-[0.2em] uppercase font-medium rounded-none">
                  <Link to="/auth">Sign In to View</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SoldListings;
