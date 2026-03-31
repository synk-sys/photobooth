import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bath, Bed, MapPin, Ruler, Lock, TrendingUp, Home, DollarSign, Clock } from "lucide-react";
import { soldListings } from "@/data/listings";
import { supabase } from "@/integrations/supabase/client";

const VISIBLE_COUNT = 4;

const SoldListingsPage = () => {
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

  const visibleListings = user ? soldListings : soldListings.slice(0, VISIBLE_COUNT);
  const hiddenCount = user ? 0 : soldListings.length - VISIBLE_COUNT;

  // Stats
  const totalSold = soldListings.length;
  const totalValue = soldListings.reduce((sum, l) => sum + l.price, 0);
  const avgPrice = Math.round(totalValue / totalSold);
  const avgDays = 5; // average days on market

  const stats = [
    { icon: Home, label: "Properties Sold", value: totalSold.toString() },
    { icon: DollarSign, label: "Total Value Sold", value: `$${(totalValue / 1_000_000).toFixed(1)}M` },
    { icon: TrendingUp, label: "Average Sale Price", value: `$${avgPrice.toLocaleString()}` },
    { icon: Clock, label: "Avg. Days on Market", value: avgDays.toString() },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-muted/30 py-16 md:py-24 section-divider">
          <div className="container text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-primary/40" />
              <p className="text-primary font-body text-[10px] tracking-[0.45em] uppercase font-medium">
                Proven Results
              </p>
              <span className="h-px w-10 bg-primary/40" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Sold Properties
            </h1>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto font-body text-[15px] font-light">
              Our track record speaks for itself. Browse our recently sold properties and see why clients trust us with their biggest investment.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-sm border border-border/60 bg-card"
                >
                  <stat.icon className="h-6 w-6 mx-auto mb-3 text-primary" />
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground font-body font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="py-12 md:py-16 bg-muted/20">
          <div className="container">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleListings.map((listing) => (
                <div
                  key={listing.id}
                  className="group overflow-hidden bg-card shadow-soft hover:shadow-luxury transition-shadow duration-500"
                >
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
                      <span className="line-clamp-1">
                        {listing.location}, {listing.city}
                      </span>
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
            </div>

            {/* Auth gate */}
            {!user && hiddenCount > 0 && (
              <div className="mt-10 border border-dashed border-border/40 rounded-sm p-12 text-center">
                <Lock className="h-8 w-8 mx-auto mb-6 text-muted-foreground/30" />
                <h3 className="font-display font-semibold text-2xl mb-3 text-foreground">
                  +{hiddenCount} More Sold Properties
                </h3>
                <p className="text-sm text-muted-foreground mb-8 font-light max-w-md mx-auto">
                  Sign in or create an account to view our complete portfolio of successful sales.
                </p>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 h-11 px-8 text-[11px] tracking-[0.2em] uppercase font-medium rounded-none"
                >
                  <Link to="/auth">Sign In to View All</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SoldListingsPage;
