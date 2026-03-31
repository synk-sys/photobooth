import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { Listing } from "@/data/listings";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { isSaved, toggleSave, isLoggedIn } = useSavedProperties();
  const saved = isSaved(listing.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(listing.id);
  };

  return (
    <Link to={`/property/${listing.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 card-shadow hover:card-shadow-hover hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {listing.featured && (
            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background hover:scale-110",
              saved && "bg-primary/90 hover:bg-primary"
            )}
            aria-label={saved ? "Remove from saved" : "Save property"}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                saved ? "fill-primary-foreground text-primary-foreground" : "text-foreground"
              )}
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4 pt-12">
            <p className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
              {formatPrice(listing.price)}
            </p>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-base text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{listing.location}, {listing.city}</span>
          </div>
          <div className="mt-4 flex items-center gap-4 text-base text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{listing.beds} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{listing.baths} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{listing.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
