import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Facebook, Instagram, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80", alt: "Elegant wedding photobooth setup" },
  { src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1600&q=80", alt: "Corporate event photobooth fun" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80", alt: "Birthday party photobooth memories" },
  { src: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=1600&q=80", alt: "Gala event photobooth experience" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[70vh] min-h-[450px] max-h-[700px] overflow-hidden -mt-24 pt-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        >
          Photobooth
        </motion.h1>
        <motion.p
          className="text-white/80 text-lg md:text-xl font-light mb-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Premium photobooth experiences for weddings, corporate events & celebrations
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <Button asChild size="lg" className="h-12 px-8 text-[11px] tracking-[0.2em] uppercase font-medium rounded-none">
            <Link to="/contact">
              Book Your Event
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/30 transition-all">
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {[
          { icon: Facebook, href: "#", label: "Facebook" },
          { icon: Instagram, href: "#", label: "Instagram" },
          { icon: Youtube, href: "#", label: "YouTube" },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white/80 transition-all hover:bg-white/30 hover:text-white hover:scale-110"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
