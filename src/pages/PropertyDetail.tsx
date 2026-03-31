import { useParams, Link } from "react-router-dom";
import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MortgageWidget from "@/components/MortgageWidget";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { listings } from "@/data/listings";
import { addLead } from "@/stores/leadsStore";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bed, Bath, Square, MapPin, Share2, Printer, Heart, Calendar, Send, Phone, Mail, ChevronLeft, ChevronRight, X, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["Details", "Photos", "Map", "Virtual Tour"] as const;
type Tab = typeof tabs[number];

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);
  const [activeTab, setActiveTab] = useState<Tab>("Details");
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addLead({
      name,
      email,
      phone,
      message: message || `I'd like to schedule a viewing for ${listing!.title}`,
      propertyId: listing!.id,
      propertyTitle: listing!.title,
      source: "schedule-viewing",
    });
    toast({ title: "Viewing Request Sent!", description: "We'll confirm your appointment shortly." });
    setName(""); setEmail(""); setPhone(""); setMessage("");
    setIsSubmitting(false);
  };

  if (!listing) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container py-12">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">Property not found</h1>
            <Button asChild className="mt-4"><Link to="/listings">Back to Listings</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate mock thumbnails (reuse same image with slight variation)
  const photos = [listing.image, listing.image, listing.image, listing.image, listing.image];

  const propertyDetails = [
    { label: "Property Type", value: "Residential" },
    { label: "Style", value: "Detached" },
    { label: "Bedrooms", value: listing.beds.toString() },
    { label: "Bathrooms", value: listing.baths.toString() },
    { label: "Square Feet", value: listing.sqft.toLocaleString() },
    { label: "City", value: listing.city },
    { label: "Status", value: listing.sold ? "Sold" : "For Sale" },
    { label: "Listing ID", value: listing.id },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Print-only header */}
      <div className="hidden print:block print-property-header mb-6">
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-sm mt-1">{listing.location}, {listing.city}</p>
        <p className="text-xl font-bold mt-2">{formatPrice(listing.price)}</p>
        <p className="text-sm mt-1">{listing.beds} Beds · {listing.baths} Baths · {listing.sqft.toLocaleString()} Sq. Ft.</p>
      </div>
      <Navbar />
      <main className="py-6">
        <div className="container">
          {/* Back button */}
          <Button asChild variant="ghost" className="mb-4 -ml-2">
            <Link to="/listings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Listings
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3 print:hidden">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">{listing.title}</h1>
              <div className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{listing.location}, {listing.city}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-bold text-primary md:text-4xl">{formatPrice(listing.price)}</p>
              <div className="mt-1 flex items-center justify-end gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {listing.beds} beds</span>
                <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {listing.baths} baths</span>
                <span className="flex items-center gap-1"><Square className="h-3.5 w-3.5" /> {listing.sqft.toLocaleString()} sq. ft.</span>
              </div>
            </div>
          </div>

          {/* Tabs + action buttons */}
          <div className="mb-0 flex items-center justify-between border-b border-border print:hidden">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pb-2">
              {listing.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              )}
              <button className="rounded-md border border-border p-1.5 text-muted-foreground hover:text-foreground transition-colors" title="Share">
                <Share2 className="h-4 w-4" />
              </button>
              <button onClick={() => window.print()} className="rounded-md border border-border p-1.5 text-muted-foreground hover:text-foreground transition-colors" title="Print">
                <Printer className="h-4 w-4" />
              </button>
              <button className="rounded-md border border-border p-1.5 text-muted-foreground hover:text-foreground transition-colors" title="Save">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main content grid */}
          <div className="mt-4 grid gap-6 lg:grid-cols-3 print:grid-cols-1">
            {/* Left: photo + content */}
            <div className="lg:col-span-2">
              {/* Main photo */}
              {activeTab !== "Map" && (
                <div className="overflow-hidden rounded-xl print:rounded-none">
                  <div className="relative aspect-[16/10] cursor-pointer" onClick={() => { setLightboxIndex(activePhoto); setLightboxOpen(true); }}>
                    <img
                      src={photos[activePhoto]}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 rounded-md bg-foreground/60 px-3 py-1.5 text-xs font-medium text-primary-foreground">
                      Click to enlarge
                    </div>
                  </div>
                  {/* Thumbnail strip */}
                  <div className="mt-2 grid grid-cols-5 gap-2 print:hidden">
                    {photos.map((photo, i) => (
                      <button
                        key={i}
                        onClick={() => { setActivePhoto(i); setActiveTab("Photos"); }}
                        className={cn(
                          "relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all",
                          activePhoto === i ? "border-primary" : "border-transparent opacity-75 hover:opacity-100"
                        )}
                      >
                        <img src={photo} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                        {i === 4 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                            <span className="text-lg font-bold text-primary-foreground">+2</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Map tab */}
              {activeTab === "Map" && (
                <div className="overflow-hidden rounded-xl aspect-[16/10]">
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${listing.location}, ${listing.city}, Ontario, Canada`)}`}
                  />
                </div>
              )}

              {/* Virtual Tour tab */}
              {activeTab === "Virtual Tour" && (
                <div className="overflow-hidden rounded-xl bg-muted aspect-[16/10] flex items-center justify-center">
                  <div className="text-center text-muted-foreground max-w-sm">
                    <RotateCw className="h-16 w-16 mx-auto mb-4 opacity-40" />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">360° Virtual Tour</h3>
                    <p className="text-sm leading-relaxed">A virtual tour for this property is not yet available. Please contact us to request a private showing.</p>
                    <Button className="mt-4" onClick={() => setActiveTab("Details")}>
                      <Calendar className="mr-2 h-4 w-4" /> Schedule a Viewing
                    </Button>
                  </div>
                </div>
              )}

              {/* Description */}
              {activeTab !== "Map" && activeTab !== "Virtual Tour" && (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3">About This Property</h2>
                    <p className="text-base leading-relaxed text-muted-foreground">{listing.description}</p>
                  </div>

                  {/* Property details table */}
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3">Property Details</h2>
                    <div className="rounded-lg border border-border overflow-hidden">
                      {propertyDetails.map((detail, i) => (
                        <div
                          key={detail.label}
                          className={cn(
                            "flex justify-between px-4 py-2.5 text-sm",
                            i % 2 === 0 ? "bg-muted/50" : "bg-background"
                          )}
                        >
                          <span className="text-muted-foreground font-medium">{detail.label}</span>
                          <span className="text-foreground font-semibold">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Schedule a viewing form */}
            <div className="lg:sticky lg:top-24 lg:self-start print:hidden">
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="bg-primary px-5 py-4">
                  <h3 className="font-display text-lg font-semibold text-primary-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule a Viewing
                  </h3>
                </div>
                <div className="p-5">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="view-name" className="text-sm">Your name <span className="text-destructive">*</span></Label>
                      <Input
                        id="view-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="view-email" className="text-sm">Email <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="view-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="bg-background pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="view-phone" className="text-sm">Phone number <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="view-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(416) 000-0000"
                          required
                          className="bg-background pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="view-message" className="text-sm">Message</Label>
                      <Textarea
                        id="view-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`I'd like to schedule a viewing for ${listing.title}...`}
                        rows={3}
                        className="bg-background resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : (
                        <><Send className="mr-2 h-4 w-4" /> Request a Viewing</>
                      )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">* Please provide your email or phone number so we can reach you.</p>
                  </form>
                </div>
              </div>

              {/* Mortgage Calculator */}
              <MortgageWidget listingPrice={listing.price} />
            </div>
          </div>

          {/* Similar Listings */}
          {(() => {
            const similar = listings.filter((l) => l.city === listing.city && l.id !== listing.id).slice(0, 4);
            if (similar.length === 0) return null;
            return (
              <div className="mt-12 print:hidden">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Similar Listings in {listing.city}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {similar.map((s) => (
                    <ListingCard key={s.id} listing={s} />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </main>
      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-black/95 [&>button]:hidden">
          <div className="relative flex items-center justify-center w-full h-[90vh]">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 rounded-full bg-foreground/30 p-2 text-primary-foreground hover:bg-foreground/50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length)}
              className="absolute left-4 z-50 rounded-full bg-foreground/30 p-3 text-primary-foreground hover:bg-foreground/50 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <img
              src={photos[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % photos.length)}
              className="absolute right-4 z-50 rounded-full bg-foreground/30 p-3 text-primary-foreground hover:bg-foreground/50 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    i === lightboxIndex ? "bg-primary-foreground" : "bg-primary-foreground/40"
                  )}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
