import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cities } from "@/data/listings";

interface PropertyFiltersProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
}

const PropertyFilters = ({
  selectedCity,
  onCityChange,
  priceRange,
  onPriceRangeChange,
}: PropertyFiltersProps) => {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="mb-8 rounded-lg border border-border bg-card p-6 card-shadow">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-foreground">
            Location
          </Label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger id="city" className="bg-background">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Price Range</Label>
            <span className="text-sm text-muted-foreground">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            min={300000}
            max={1500000}
            step={25000}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
