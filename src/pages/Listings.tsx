import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyComparison from "@/components/PropertyComparison";
import ListingsMap from "@/components/ListingsMap";
import { listings, Listing } from "@/data/listings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  List,
  LayoutGrid,
  Map,
  ChevronDown,
  Heart,
  Scale,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ListingType = "sale" | "rent";
type ViewMode = "list" | "grid" | "split";
type SortOption = "newest" | "price-asc" | "price-desc" | "beds" | "sqft";
type PropertyType = "all" | "detached" | "semi" | "townhouse" | "condo" | "bungalow";

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "detached", label: "Detached" },
  { value: "semi", label: "Semi-Detached" },
  { value: "townhouse", label: "Townhouse" },
  { value: "condo", label: "Condo Apartment" },
  { value: "bungalow", label: "Bungalow" },
];

const Listings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const areaParam = searchParams.get("area") || "";
  const [searchQuery, setSearchQuery] = useState(areaParam);
  const [listingType, setListingType] = useState<ListingType>("sale");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>("all");
  const [bedsMin, setBedsMin] = useState(0);
  const [bathsMin, setBathsMin] = useState(0);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [savedListings, setSavedListings] = useState<string[]>([]);
  const [compareListings, setCompareListings] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);

  useEffect(() => {
    if (areaParam) {
      setSearchQuery(areaParam);
    }
  }, [areaParam]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const filteredListings = useMemo(() => {
    let result = listings.filter((listing) => {
      const matchesSearch =
        searchQuery === "" ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        listing.price >= priceRange[0] && listing.price <= priceRange[1];
      const matchesBeds = listing.beds >= bedsMin;
      const matchesBaths = listing.baths >= bathsMin;
      return matchesSearch && matchesPrice && matchesBeds && matchesBaths;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "beds":
        result.sort((a, b) => b.beds - a.beds);
        break;
      case "sqft":
        result.sort((a, b) => b.sqft - a.sqft);
        break;
      default:
        // newest - keep original order
        break;
    }

    return result;
  }, [searchQuery, priceRange, sortBy, bedsMin, bathsMin]);

  const toggleSaved = (id: string) => {
    setSavedListings((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setCompareListings((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 4) {
        return prev; // Max 4 properties
      }
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareListings((prev) => prev.filter((i) => i !== id));
  };

  const comparedProperties = useMemo(() => {
    return listings.filter((l) => compareListings.includes(l.id));
  }, [compareListings]);

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 2000000]);
    setSelectedPropertyType("all");
    setBedsMin(0);
    setBathsMin(0);
  };

  const getPropertyType = (listing: Listing): string => {
    const title = listing.title.toLowerCase();
    if (title.includes("condo") || title.includes("loft")) return "Condo Apartment";
    if (title.includes("townhouse") || title.includes("townhome")) return "Townhouse";
    if (title.includes("semi")) return "Semi-Detached";
    if (title.includes("bungalow")) return "Bungalow";
    return "Detached";
  };

  const getDaysOnMarket = () => Math.floor(Math.random() * 30);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Address, Neighbourhood, City or MLS #"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* For Sale / For Rent Toggle */}
            <Select
              value={listingType}
              onValueChange={(v) => setListingType(v as ListingType)}
            >
              <SelectTrigger className="w-[130px] h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-11 gap-2">
                  {formatPrice(priceRange[0])}-{formatPrice(priceRange[1])}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={2000000}
                    step={25000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* More Filters */}
            <Popover open={showMoreFilters} onOpenChange={setShowMoreFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-11 gap-2">
                  More Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Bedrooms (min)</h4>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <Button
                          key={n}
                          size="sm"
                          variant={bedsMin === n ? "default" : "outline"}
                          onClick={() => setBedsMin(n)}
                          className="flex-1"
                        >
                          {n === 0 ? "Any" : n + "+"}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Bathrooms (min)</h4>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((n) => (
                        <Button
                          key={n}
                          size="sm"
                          variant={bathsMin === n ? "default" : "outline"}
                          onClick={() => setBathsMin(n)}
                          className="flex-1"
                        >
                          {n === 0 ? "Any" : n + "+"}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Property Type</h4>
                    <Select
                      value={selectedPropertyType}
                      onValueChange={(v) =>
                        setSelectedPropertyType(v as PropertyType)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Reset Filters */}
            <Button
              variant="ghost"
              className="h-11 text-primary hover:text-primary/80"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="ml-auto flex items-center gap-1 border border-border rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                className="h-8 px-3 gap-1"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                className="h-8 px-3 gap-1"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </Button>
              <Button
                size="sm"
                variant={viewMode === "split" ? "default" : "ghost"}
                className="h-8 px-3 gap-1"
                onClick={() => setViewMode("split")}
              >
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Map</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Bar & Results Count */}
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort by</span>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Listings</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="beds">Most Bedrooms</SelectItem>
              <SelectItem value="sqft">Largest Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm">
          <span className="font-semibold">Results:</span>{" "}
          <span className="text-foreground font-bold">
            {filteredListings.length} Listings
          </span>
        </p>
      </div>

      {/* Listings Content */}
      <main className={cn(
        "pb-12",
        viewMode === "split" ? "flex" : "container"
      )}>
        {/* Map Panel - left side in split view */}
        {viewMode === "split" && (
          <div className="w-1/2 sticky top-[73px] h-[calc(100vh-73px)] p-2">
            <ListingsMap
              listings={filteredListings}
              onListingClick={(id) => navigate(`/property/${id}`)}
              hoveredListingId={hoveredListingId}
              onListingHover={setHoveredListingId}
            />
          </div>
        )}

        <div className={cn(
          viewMode === "split" ? "w-1/2 overflow-y-auto p-4" : ""
        )}>
          {filteredListings.length > 0 ? (
            <div
              className={cn(
                "grid gap-5",
                viewMode === "list"
                  ? "grid-cols-1"
                  : viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              )}
            >
              {filteredListings.map((listing) => {
                const propertyType = getPropertyType(listing);
                const daysOnMarket = getDaysOnMarket();

                return (
                  <Link
                    key={listing.id}
                    to={`/property/${listing.id}`}
                    onMouseEnter={() => setHoveredListingId(listing.id)}
                    onMouseLeave={() => setHoveredListingId(null)}
                    className={cn(
                      "group relative bg-card rounded-lg overflow-hidden border transition-all duration-200",
                      viewMode === "list" && "flex",
                      hoveredListingId === listing.id
                        ? "border-primary shadow-lg ring-2 ring-primary/20 scale-[1.01]"
                        : "border-border hover:shadow-lg"
                    )}
                  >
                    {/* Image */}
                    <div
                      className={cn(
                        "relative overflow-hidden",
                        viewMode === "list"
                          ? "w-64 flex-shrink-0"
                          : "aspect-[4/3]"
                      )}
                    >
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badges */}
                      <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-600 text-white text-xs font-semibold">
                        For Sale
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="absolute top-3 right-3 bg-black/70 text-white text-xs"
                      >
                        {daysOnMarket} Days
                      </Badge>
                      {/* Save Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSaved(listing.id);
                        }}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            savedListings.includes(listing.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          )}
                        />
                      </button>
                      {/* Compare Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCompare(listing.id);
                        }}
                        className={cn(
                          "absolute bottom-3 left-3 p-2 rounded-full transition-colors",
                          compareListings.includes(listing.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-white/90 hover:bg-white text-muted-foreground"
                        )}
                        title={compareListings.includes(listing.id) ? "Remove from compare" : "Add to compare"}
                      >
                        <Scale className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-xl text-foreground">
                          ${listing.price.toLocaleString()}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {propertyType}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-2 text-sm text-primary">
                        <span className="flex items-center gap-1">
                          {listing.beds} Beds
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                          {listing.baths} Baths
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                          {listing.sqft.toLocaleString()} Sqft
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-1">
                        {listing.location}, {listing.city}, ON
                      </p>

                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          MLS# C{listing.id.padStart(7, "0")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          MYREALCO INC., BROKERAGE
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                No properties match your criteria.
              </p>
              <Button onClick={resetFilters} variant="outline">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Compare Floating Bar */}
      {compareListings.length > 0 && !showComparison && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
          <div className="container py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">
                    {compareListings.length} Properties Selected
                  </span>
                  <span className="text-sm text-muted-foreground">(max 4)</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  {comparedProperties.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full"
                    >
                      <span className="text-sm truncate max-w-[120px]">{p.title}</span>
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {compareListings.length > 3 && (
                    <span className="text-sm text-muted-foreground">
                      +{compareListings.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCompareListings([])}
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setShowComparison(true)}
                  disabled={compareListings.length < 2}
                >
                  Compare Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && comparedProperties.length >= 2 && (
        <PropertyComparison
          properties={comparedProperties}
          onRemove={removeFromCompare}
          onClose={() => setShowComparison(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Listings;
