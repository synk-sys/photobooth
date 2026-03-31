import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "The photobooth was the highlight of our wedding! Every single guest loved it and the prints turned out beautifully. We couldn't have asked for a better experience.",
    name: "Emily & James",
    type: "Wedding",
  },
  {
    quote: "We booked Photobooth for our company holiday party and it was a massive hit. The custom branding was perfect and the attendant was so professional and fun.",
    name: "Sarah T.",
    type: "Corporate Event",
  },
  {
    quote: "My daughter's sweet sixteen was absolutely magical. The backdrop and props were gorgeous and the instant prints were something everyone took home as a keepsake.",
    name: "Maria G.",
    type: "Birthday Party",
  },
  {
    quote: "Setup was seamless, the quality of photos was stunning, and the team was incredibly responsive. I've already booked them again for our next gala!",
    name: "The Rivera Family",
    type: "Special Occasion",
  },
  {
    quote: "Booked for a charity gala and received so many compliments. The digital sharing feature meant photos were circulating on social media within minutes of being taken.",
    name: "David & Anita",
    type: "Gala",
  },
  {
    quote: "Outstanding service from inquiry to event day. Everything was customized to match our theme and the quality of the prints was exceptional. Highly recommend!",
    name: "Jessica M.",
    type: "Wedding",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-16 md:py-20 bg-secondary/20">
      <div className="container">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-primary/40" />
            <p className="text-primary font-body text-sm tracking-[0.35em] uppercase font-medium">
              Testimonials
            </p>
            <span className="h-px w-10 bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Happy Clients
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md mx-auto font-body text-[15px] font-light">
            Real stories from real events — see why clients love our photobooth experience
          </p>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-background border-border/30 shadow-lg hidden md:flex h-11 w-11 rounded-none hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-background border-border/30 shadow-lg hidden md:flex h-11 w-11 rounded-none hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="overflow-hidden mx-4 md:mx-10">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-3">
                  <div className="h-full bg-background border border-border/30 p-9 flex flex-col shadow-soft">
                    <div className="w-8 h-px bg-primary/40 mb-6" />
                    <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg flex-1 italic font-light">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t border-border/30 pt-5">
                      <p className="font-display font-semibold text-foreground text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] text-primary tracking-[0.3em] uppercase mt-1.5 font-medium">
                        {testimonial.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <Button variant="outline" size="icon" onClick={goToPrevious} className="h-10 w-10 border-border/30 rounded-none hover:border-primary hover:bg-primary hover:text-primary-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext} className="h-10 w-10 border-border/30 rounded-none hover:border-primary hover:bg-primary hover:text-primary-foreground">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-primary/20 w-4"
                }`}
                onClick={() => { setIsAutoPlaying(false); setCurrentIndex(index); }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
