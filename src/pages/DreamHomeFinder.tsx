import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Home, MapPin, Heart, CheckCircle, Loader2 } from "lucide-react";
import { addLead } from "@/stores/leadsStore";
import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";

const DreamHomeFinder = () => {
  const { toast } = useToast();
  const { predictions, isLoading: autocompleteLoading, showSuggestions, fetchPredictions, selectPlace, clearSuggestions } = usePlacesAutocomplete();
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    preferredLocation: "",
    propertyTypes: [] as string[],
    minBedrooms: "",
    minBathrooms: "",
    priceMin: "",
    priceMax: "",
    mustHaveFeatures: [] as string[],
    timeline: "",
    name: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, propertyTypes: [...formData.propertyTypes, type] });
    } else {
      setFormData({ ...formData, propertyTypes: formData.propertyTypes.filter(t => t !== type) });
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, mustHaveFeatures: [...formData.mustHaveFeatures, feature] });
    } else {
      setFormData({ ...formData, mustHaveFeatures: formData.mustHaveFeatures.filter(f => f !== feature) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await addLead({
      propertyId: "dream-home-finder",
      propertyTitle: "Dream Home Finder Request",
      name: formData.name,
      email: formData.email,
      message: `Preferred Location: ${formData.preferredLocation}
Property Types: ${formData.propertyTypes.join(", ")}
Min Beds: ${formData.minBedrooms}, Min Baths: ${formData.minBathrooms}
Budget: $${formData.priceMin} - $${formData.priceMax}
Must-Have Features: ${formData.mustHaveFeatures.join(", ")}
Timeline: ${formData.timeline}
Phone: ${formData.phone}
Additional Info: ${formData.additionalInfo}`,
    });

    setIsSubmitting(false);
    setStep(4);
    toast({
      title: "Request Submitted!",
      description: "We'll start searching for your dream home right away!",
    });
  };

  const propertyTypes = [
    "Detached House",
    "Semi-Detached House",
    "Townhouse",
    "Condo/Apartment",
    "Bungalow",
  ];

  const features = [
    "Garage",
    "Swimming Pool",
    "Finished Basement",
    "Updated Kitchen",
    "Central Air",
    "Fireplace",
    "Large Backyard",
    "Near Schools",
    "Near Transit",
    "Quiet Neighbourhood",
  ];

  const timelines = [
    "ASAP - Ready to buy now",
    "1-3 months",
    "3-6 months",
    "6-12 months",
    "Just browsing",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12">
        <div className="container max-w-3xl">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`h-1 w-12 ${step > s ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <Card className="card-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-display text-2xl md:text-3xl">
                Dream Home Finder
              </CardTitle>
              <CardDescription className="text-base">
                Tell us what you're looking for and we'll find it for you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="preferredLocation">Preferred Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="preferredLocation"
                        name="preferredLocation"
                        placeholder="Start typing an address or area..."
                        value={formData.preferredLocation}
                        onChange={(e) => {
                          handleChange(e);
                          fetchPredictions(e.target.value);
                        }}
                        onFocus={() => {
                          if (formData.preferredLocation.length >= 3) fetchPredictions(formData.preferredLocation);
                        }}
                        onBlur={() => {
                          setTimeout(() => clearSuggestions(), 200);
                        }}
                        className="pl-10"
                        autoComplete="off"
                        required
                      />
                      {autocompleteLoading && (
                        <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                    {showSuggestions && predictions.length > 0 && (
                      <div
                        ref={suggestionsRef}
                        className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-md border border-border bg-popover shadow-md"
                      >
                        {predictions.map((prediction) => (
                          <button
                            key={prediction.placeId}
                            type="button"
                            className="flex w-full flex-col px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0"
                            onMouseDown={async (e) => {
                              e.preventDefault();
                              const detail = await selectPlace(prediction.placeId);
                              if (detail) {
                                setFormData((prev) => ({
                                  ...prev,
                                  preferredLocation: detail.formattedAddress || detail.address,
                                }));
                              }
                            }}
                          >
                            <span className="text-sm font-medium text-foreground">{prediction.mainText}</span>
                            <span className="text-xs text-muted-foreground">{prediction.secondaryText}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Property Types *</Label>
                    <div className="grid gap-2 md:grid-cols-2">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={formData.propertyTypes.includes(type)}
                            onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
                          />
                          <label htmlFor={type} className="text-sm">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="minBedrooms">Min Bedrooms *</Label>
                      <Input
                        id="minBedrooms"
                        name="minBedrooms"
                        type="number"
                        placeholder="2"
                        value={formData.minBedrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minBathrooms">Min Bathrooms *</Label>
                      <Input
                        id="minBathrooms"
                        name="minBathrooms"
                        type="number"
                        placeholder="2"
                        value={formData.minBathrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!formData.preferredLocation || formData.propertyTypes.length === 0 || !formData.minBedrooms || !formData.minBathrooms}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="priceMin">Min Budget ($) *</Label>
                      <Input
                        id="priceMin"
                        name="priceMin"
                        type="number"
                        placeholder="500000"
                        value={formData.priceMin}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priceMax">Max Budget ($) *</Label>
                      <Input
                        id="priceMax"
                        name="priceMax"
                        type="number"
                        placeholder="1000000"
                        value={formData.priceMax}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Must-Have Features</Label>
                    <div className="grid gap-2 md:grid-cols-2">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={formData.mustHaveFeatures.includes(feature)}
                            onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                          />
                          <label htmlFor={feature} className="text-sm">{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">When do you need to move? *</Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required
                    >
                      <option value="">Select timeline...</option>
                      {timelines.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!formData.priceMin || !formData.priceMax || !formData.timeline}
                      className="flex-1"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(416) 555-0123"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Anything else we should know?</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      placeholder="Special requirements, accessibility needs, lifestyle preferences..."
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Submitting..." : "Find My Dream Home"}
                    </Button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold">We're On It!</h3>
                  <p className="text-muted-foreground">
                    Sanjeev will personally start searching for properties matching your criteria.
                    Expect to hear from us within 24 hours with some great options!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <Home className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold">Personalized Search</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We find homes that match YOUR criteria
              </p>
            </div>
            <div className="text-center">
              <Heart className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold">VIP Access</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get notified before listings hit the market
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold">Expert Guidance</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                19+ years helping families find homes
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DreamHomeFinder;
