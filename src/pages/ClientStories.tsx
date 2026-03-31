import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Quote } from "lucide-react";

const clientStories = [
  {
    name: "Sarah & Michael Thompson",
    quote: "Working with MyRealCo was an incredible experience. We were first-time homebuyers and felt overwhelmed by the GTA market. Our agent took the time to understand exactly what we needed and guided us every step of the way. We found our dream home in Mississauga within our budget!",
    location: "Mississauga",
    type: "First-Time Buyers",
    videoUrl: "/videos/testimonial-1.mp4",
  },
  {
    name: "David Chen",
    quote: "I was looking to invest in pre-construction condos and needed expert advice. The team at MyRealCo provided me with detailed market analysis and helped me secure units in two amazing developments. Their knowledge of the GTA real estate market is unmatched.",
    location: "Toronto",
    type: "Investor",
    videoUrl: "/videos/testimonial-2.mp4",
  },
  {
    name: "The Martinez Family",
    quote: "We relocated from Vancouver and needed to find a family home quickly. MyRealCo understood our timeline and priorities perfectly. They showed us properties in great school districts and we closed on our beautiful home in Oakville within 6 weeks. Couldn't be happier!",
    location: "Oakville",
    type: "Relocation",
    videoUrl: "/videos/testimonial-3.mp4",
  },
  {
    name: "Jennifer Williams",
    quote: "Selling my condo during a challenging market seemed daunting, but MyRealCo's marketing strategy was exceptional. They staged my home beautifully, had professional photos taken, and we received multiple offers within the first week. Sold above asking price!",
    location: "Downtown Toronto",
    type: "Seller",
    videoUrl: "/videos/testimonial-4.mp4",
  },
  {
    name: "Robert & Linda Park",
    quote: "After 30 years in our family home, we decided to downsize. MyRealCo helped us sell our house and find a perfect condo near our grandchildren. They handled everything with such care and professionalism. We felt supported throughout the entire process.",
    location: "Richmond Hill",
    type: "Downsizers",
    videoUrl: "/videos/testimonial-5.mp4",
  },
  {
    name: "Amit Patel",
    quote: "As a busy professional, I needed an agent who could work around my schedule. MyRealCo was incredibly accommodating with virtual tours and evening showings. They found me an amazing townhouse near the GO station - perfect for my commute!",
    location: "Brampton",
    type: "First-Time Buyer",
    videoUrl: "/videos/testimonial-6.mp4",
  },
];

const ClientStories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl">
              Client Success Stories
            </h1>
            <p className="text-lg text-primary-foreground/90 md:text-xl">
              Our clients have shared their experience working with us from the beginning 
              of their real estate journey, right to the very end. Here is what they had to say:
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {clientStories.map((story, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                {/* Video Player */}
                <div className="relative aspect-video w-full bg-muted">
                  <video
                    controls
                    className="absolute inset-0 h-full w-full object-cover"
                    preload="metadata"
                  >
                    <source src={story.videoUrl} type="video/mp4" />
                  </video>
                </div>

                <div className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Quote className="h-5 w-5 text-primary" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="mb-4 text-sm text-muted-foreground line-clamp-4">
                    "{story.quote}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold text-foreground">{story.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {story.type}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {story.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to Start Your Success Story?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join our growing family of satisfied clients. Let us help you achieve your real estate goals.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Us Today
            </a>
            <a
              href="/home-valuation"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Get a Free Home Valuation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientStories;
