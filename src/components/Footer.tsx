import { useState } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    toast({ title: "Subscribed!", description: "You'll receive our latest updates and offers." });
    setEmail("");
  };

  return (
    <footer className="bg-primary py-10 md:py-14">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold text-primary-foreground">Photobooth</p>
            <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed font-body font-light">
              Premium photobooth rental experiences for weddings, corporate events, and all your special celebrations.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-primary-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3.5 text-sm text-primary-foreground/90 font-body font-light">
                <Phone className="h-4 w-4 text-primary-foreground/70 flex-shrink-0" />
                (416) 555-0100
              </li>
              <li className="flex items-center gap-3.5 text-sm text-primary-foreground/90 font-body font-light">
                <Mail className="h-4 w-4 text-primary-foreground/70 flex-shrink-0" />
                hello@photobooth.com
              </li>
              <li className="flex items-center gap-3.5 text-sm text-primary-foreground/90 font-body font-light">
                <MapPin className="h-4 w-4 text-primary-foreground/70 flex-shrink-0" />
                Toronto, ON
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-primary-foreground mb-4">Follow Us</h3>
            <div className="flex gap-5">
              <a href="#" className="text-primary-foreground/70 transition-colors duration-300 hover:text-primary-foreground" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 transition-colors duration-300 hover:text-primary-foreground" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 transition-colors duration-300 hover:text-primary-foreground" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">Stay Updated</h3>
            <p className="text-primary-foreground/70 text-sm font-body font-light mb-4 leading-relaxed">
              Get special offers and event inspiration delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-l-md border-0 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary-foreground/30 font-body"
                  required
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-primary-foreground px-4 py-2.5 text-primary transition-opacity hover:opacity-90"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-primary-foreground/50 text-[10px] font-body font-light">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6">
          <p className="text-center text-primary-foreground/70 text-xs font-body tracking-[0.15em] font-medium">
            © {new Date().getFullYear()} Photobooth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
