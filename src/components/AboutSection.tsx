import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden section-divider">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
                alt="Photobooth setup"
                className="w-full h-auto object-cover shadow-luxury"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/10 -z-10" />
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-primary/40" />
              <p className="text-primary font-body text-sm tracking-[0.35em] uppercase font-medium">
                Your Trusted Photobooth Partner
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 leading-tight">
              About Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-[15px] font-light">
              Photobooth is a premium photobooth rental company specializing in creating
              unforgettable memories at weddings, corporate events, birthday parties,
              and all special occasions across the Greater Toronto Area.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10 text-[15px] font-light">
              With state-of-the-art equipment, stunning custom backdrops, and a curated
              selection of fun props, we ensure every guest leaves with a lasting memory.
              Our professional team handles setup, operation, and breakdown so you can
              focus on enjoying your event.
            </p>

            <ul className="space-y-4 mb-12">
              {[
                "Premium open-air & enclosed photobooth rentals",
                "Custom branding, backdrops & print designs",
                "Instant digital sharing & unlimited prints",
                "Professional attendant for every event",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3.5 text-foreground text-[15px] font-light">
                  <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="border-foreground/15 text-foreground hover:border-primary hover:text-primary h-12 px-8 text-[11px] tracking-[0.2em] uppercase font-medium rounded-none">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
