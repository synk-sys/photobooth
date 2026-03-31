import { Link } from "react-router-dom";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const areas = [
  {
    name: "Toronto",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    link: "/listings?area=toronto",
  },
  {
    name: "Markham",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    link: "/listings?area=markham",
  },
  {
    name: "Scarborough",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    link: "/listings?area=scarborough",
  },
  {
    name: "Brampton",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    link: "/listings?area=brampton",
  },
  {
    name: "Oakville",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    link: "/listings?area=oakville",
  },
  {
    name: "Etobicoke",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    link: "/listings?area=etobicoke",
  },
  {
    name: "Mississauga",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
    link: "/listings?area=mississauga",
  },
  {
    name: "Pickering",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80",
    link: "/listings?area=pickering",
  },
  {
    name: "Hamilton",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    link: "/listings?area=hamilton",
  },
];

const AreaListings = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("a")?.offsetWidth || 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-primary/40" />
            <p className="text-primary font-body text-sm tracking-[0.35em] uppercase font-medium">
              Explore Neighbourhoods
            </p>
            <span className="h-px w-10 bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Properties by Area
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md mx-auto font-body text-[15px] font-light">
            Check active listings in your neighbourhood
          </p>
        </div>

        <div className="relative">
          {/* Scroll buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md border-border"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md border-border"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {areas.map((area, index) => (
              <Link
                key={index}
                to={area.link}
                className="group block flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[calc(25%-12px)] snap-start"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={area.image}
                    alt={`${area.name} listings`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-primary/70 text-[10px] tracking-[0.35em] uppercase font-body mb-1.5 font-medium">Discover</p>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground tracking-wide">
                      {area.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreaListings;
