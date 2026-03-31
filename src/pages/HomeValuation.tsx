import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Home, MapPin, DollarSign, CheckCircle, Loader2 } from "lucide-react";
import { addLead } from "@/stores/leadsStore";
import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";

const HomeValuation = () => {
  const { toast } = useToast();
  const { predictions, isLoading: autocompleteLoading, showSuggestions, fetchPredictions, selectPlace, clearSuggestions } = usePlacesAutocomplete();
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    basementType: "",
    parkingType: "",
    listingStatus: "",
    userType: [] as string[],
    name: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await addLead({
      propertyId: "home-valuation",
      propertyTitle: "Free Home Valuation Request",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `Address: ${formData.address}, ${formData.city}, ${formData.postalCode}
Property Type: ${formData.propertyType}
Beds: ${formData.bedrooms}, Baths: ${formData.bathrooms}, Sqft: ${formData.squareFeet}
Year Built: ${formData.yearBuilt}
Basement: ${formData.basementType}
Parking: ${formData.parkingType}
Listing Status: ${formData.listingStatus}
I am a: ${formData.userType.join(", ")}
Additional Info: ${formData.additionalInfo}`,
    });

    setIsSubmitting(false);
    setStep(4);
    toast({
      title: "Request Submitted!",
      description: "We'll send you a free home valuation within 48 hours.",
    });
  };

  const propertyTypes = [
    "Detached House",
    "Semi-Detached House",
    "Townhouse",
    "Condo/Apartment",
    "Bungalow",
    "Other",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12">
        {step >= 2 && (
        /* Step Progress Banner */
        <div className="flex w-full overflow-hidden">
          {[
            { num: 1, title: "STEP ONE", subtitle: "Your Address" },
            { num: 2, title: "STEP TWO", subtitle: "Home Details" },
            { num: 3, title: "LAST STEP", subtitle: "Your Info" },
          ].map((s, i) => {
            const isActive = step >= s.num;
            const isCurrent = step === s.num;
            const isPast = step > s.num;
            return (
              <div
                key={s.num}
                onClick={() => { if (s.num < step) setStep(s.num); }}
                className={`relative flex flex-1 items-center gap-3 px-4 py-4 md:px-6 md:py-5 transition-colors ${isPast ? "cursor-pointer" : ""} ${
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "bg-primary/60 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                style={{
                  clipPath:
                    i < 2
                      ? "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)"
                      : undefined,
                  marginRight: i < 2 ? "-10px" : undefined,
                  zIndex: 3 - i,
                }}
              >
                <span className={`text-2xl md:text-3xl font-bold ${isActive ? "text-primary-foreground/40" : "text-muted-foreground/40"}`}>
                  {s.num}
                </span>
                <div>
                  <p className="text-xs md:text-sm font-bold tracking-wider uppercase">{s.title}</p>
                  <p className={`text-xs md:text-sm ${isActive ? "text-primary-foreground/80" : "text-muted-foreground/70"}`}>
                    {s.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        )}

        <div className="container max-w-3xl py-8">
          <Card className="card-shadow min-h-[500px]">
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="font-display text-2xl md:text-3xl">
                {step === 3 ? "Who Do I Send The Evaluation To?" : "What's Your Home Worth?"}
              </CardTitle>
              {step !== 3 && (
                <CardDescription className="text-base">
                  Get a FREE home evaluation from our expert team
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="px-6 pb-8">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="address">Street Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        placeholder="Start typing your address..."
                        value={formData.address}
                        onChange={(e) => {
                          handleChange(e);
                          fetchPredictions(e.target.value);
                        }}
                        onFocus={() => {
                          if (formData.address.length >= 3) fetchPredictions(formData.address);
                        }}
                        onBlur={() => {
                          // Delay to allow click on suggestion
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
                                  address: detail.address,
                                  city: detail.city,
                                  postalCode: detail.postalCode,
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
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Toronto"
                        value={formData.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="M1A 1A1"
                        value={formData.postalCode}
                        onChange={handleChange}
                        autoComplete="postal-code"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!formData.address || !formData.city || !formData.postalCode}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required
                    >
                      <option value="">Select type...</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms *</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        placeholder="3"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms *</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        placeholder="2"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="squareFeet">Square Feet (approx)</Label>
                      <Input
                        id="squareFeet"
                        name="squareFeet"
                        placeholder="2000"
                        value={formData.squareFeet}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input
                        id="yearBuilt"
                        name="yearBuilt"
                        placeholder="2005"
                        value={formData.yearBuilt}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basementType">Basement Type</Label>
                    <select
                      id="basementType"
                      name="basementType"
                      value={formData.basementType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select basement type...</option>
                      {["Crawl Space", "Dugout", "Full", "None", "Part", "Walkout", "Finished", "Unfinished"].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parkingType">Parking Type</Label>
                    <select
                      id="parkingType"
                      name="parkingType"
                      value={formData.parkingType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select parking type...</option>
                      {["No Garage", "On Street", "Off Street", "Parking Pad Cement or Paved", "Underground", "Single Carport", "Single Garage Attached", "Single Garage Detached", "Double Carport", "Double Garage Attached", "Double Garage Detached", "Triple Garage Attached", "Triple Garage Detached", "Quad Or More Attached", "Quad Or More Detached", "Attached", "Built-in", "Carport", "Detached", "Other", "No Parking"].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listingStatus">Listing Status</Label>
                    <select
                      id="listingStatus"
                      name="listingStatus"
                      value={formData.listingStatus}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select listing status...</option>
                      {["Not Currently Listed", "For Sale by Owner", "Listed with Agent"].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!formData.propertyType || !formData.bedrooms || !formData.bathrooms}
                    className="w-full"
                  >
                    Continue
                  </Button>
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
                    <Label>I am a: <span className="text-destructive">*</span> <span className="text-sm font-normal text-muted-foreground">(select up to 2 categories)</span></Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Buyer", "Seller", "Renter", "Other"].map((type) => {
                        const isSelected = formData.userType.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => {
                                const current = prev.userType;
                                if (isSelected) {
                                  return { ...prev, userType: current.filter((t) => t !== type) };
                                }
                                if (current.length >= 2) return prev;
                                return { ...prev, userType: [...current, type] };
                              });
                            }}
                            className={`rounded-md border px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-muted text-muted-foreground hover:bg-accent"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">What type of Buyer are you?</Label>
                    <Input
                      id="additionalInfo"
                      name="additionalInfo"
                      placeholder="What type of Buyer are you?"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Submitting..." : "Get Evaluation"}
                  </Button>
                </form>
              )}

              {step === 4 && (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold">Thank You!</h3>
                  <p className="text-muted-foreground">
                    Your request has been submitted. Sanjeev will personally review your property
                    details and send you a comprehensive valuation within 48 hours.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <Home className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold">Local Expert</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                19+ years of GTA market experience
              </p>
            </div>
            <div className="text-center">
              <DollarSign className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold">100% Free</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No obligation, no hidden fees
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="mx-auto mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold">Fast Results</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get your valuation in 48 hours
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeValuation;
