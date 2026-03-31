import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { listings } from "@/data/listings";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);

const FeaturedListings = () => {
  const featuredListings = listings.filter((l) => l.featured).concat(
    listings.filter((l) => !l.featured).slice(0, 3)
  ).slice(0, 6);
  const { isSaved, toggleSave } = useSavedProperties();

  const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(id);
  };

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden section-divider">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-primary/40" />
              <p className="text-primary font-body text-sm tracking-[0.35em] uppercase font-medium">
                Featured Properties
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
              Exceptional Homes,<br className="hidden md:block" /> Extraordinary Living
            </h2>
          </div>
          <Button asChild variant="outline" size="lg" className="group self-start md:self-auto border-foreground/10 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all h-12 px-8 text-[11px] tracking-[0.2em] uppercase font-medium rounded-none">
            <Link to="/listings">
              View All Listings
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {featuredListings.map((listing) => (
            <FeaturedCard
              key={listing.id}
              listing={listing}
              saved={isSaved(listing.id)}
              onFavorite={handleFavoriteClick}
            />
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {featuredListings.map((listing) => (
                <CarouselItem key={listing.id} className="pl-4 basis-[85%] md:basis-1/2">
                  <FeaturedCard
                    listing={listing}
                    saved={isSaved(listing.id)}
                    onFavorite={handleFavoriteClick}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-10">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-foreground/10 hover:border-primary hover:bg-primary hover:text-primary-foreground rounded-none" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-foreground/10 hover:border-primary hover:bg-primary hover:text-primary-foreground rounded-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

interface FeaturedCardProps {
  listing: (typeof listings)[0];
  saved: boolean;
  onFavorite: (e: React.MouseEvent, id: string) => void;
}

const FeaturedCard = ({ listing, saved, onFavorite }: FeaturedCardProps) => (
  <Link to={`/property/${listing.id}`} className="group block">
    <div className="relative overflow-hidden bg-card shadow-soft hover:shadow-luxury transition-shadow duration-500">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

        {/* Save button */}
        <button
          onClick={(e) => onFavorite(e, listing.id)}
          className={cn(
            "absolute right-4 top-4 rounded-full p-2.5 backdrop-blur-md transition-all hover:scale-110",
            saved
              ? "bg-primary text-primary-foreground"
              : "bg-background/20 text-primary-foreground hover:bg-background/40"
          )}
          aria-label={saved ? "Remove from saved" : "Save property"}
        >
          <Heart className={cn("h-5 w-5", saved && "fill-current")} />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-4 left-5">
          <p className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground drop-shadow-lg">
            {formatPrice(listing.price)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {listing.title}
        </h3>
        <div className="mt-2.5 flex items-center gap-1.5 text-sm text-muted-foreground font-light">
          <MapPin className="h-3.5 w-3.5 text-primary/60" />
          <span>{listing.location}, {listing.city}</span>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border/60" />

        {/* Stats */}
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
            <Square className="h-4 w-4 text-primary/50" />
            <span>{listing.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default FeaturedListings;
