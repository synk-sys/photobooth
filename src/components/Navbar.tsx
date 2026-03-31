import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { HoverDropdown, HoverDropdownItem } from "@/components/HoverDropdown";
import { cn } from "@/lib/utils";

const Navbar = ({ transparent = false }: { transparent?: boolean }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const servicesActive = location.pathname === "/services";
  const galleryActive = location.pathname === "/gallery";
  const aboutActive = ["/about", "/contact"].includes(location.pathname);

  const servicesLinks = [
    { to: "/services", label: "All Services" },
    { to: "/services/weddings", label: "Weddings" },
    { to: "/services/corporate", label: "Corporate Events" },
    { to: "/services/birthdays", label: "Birthday Parties" },
  ];

  const aboutLinks = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  const renderDropdownLinks = (links: { to: string; label: string }[]) =>
    links.map((link) => (
      <HoverDropdownItem key={link.to}>
        <Link to={link.to} className={`flex w-full items-center ${isActive(link.to) ? "text-primary" : ""}`}>
          {link.label}
        </Link>
      </HoverDropdownItem>
    ));

  const toggleMobileSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderMobileSection = (title: string, links: { to: string; label: string }[]) => (
    <div key={title}>
      <button
        onClick={() => toggleMobileSection(title)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wider text-foreground/70"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expandedSection === title && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-200", expandedSection === title ? "max-h-96" : "max-h-0")}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMobileMenuOpen(false)}
            className={cn("block px-6 py-2.5 text-sm transition-colors", isActive(link.to) ? "text-primary font-medium" : "text-foreground/60 hover:text-foreground")}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const isTransparent = transparent && !scrolled;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out",
      isTransparent ? "bg-transparent border-b border-transparent" : "bg-background border-b border-border/40"
    )}>
      <div className="container flex h-24 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
          <span className={cn("font-display text-2xl font-semibold transition-colors", isTransparent ? "text-white" : "text-foreground")}>
            Photobooth
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            to="/"
            className={cn("text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary", isActive("/") ? "text-primary" : isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80")}
          >
            Home
          </Link>

          <HoverDropdown trigger="Services" isActive={servicesActive} align="start" transparent={isTransparent}>
            {renderDropdownLinks(servicesLinks)}
          </HoverDropdown>

          <Link
            to="/gallery"
            className={cn("text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary", galleryActive ? "text-primary" : isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80")}
          >
            Gallery
          </Link>

          <Link
            to="/packages"
            className={cn("text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary", isActive("/packages") ? "text-primary" : isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80")}
          >
            Packages
          </Link>

          <HoverDropdown trigger="About" isActive={aboutActive} align="end" transparent={isTransparent}>
            {renderDropdownLinks(aboutLinks)}
          </HoverDropdown>

          <span className={cn("h-5 w-px", isTransparent ? "bg-white/40" : "bg-border/60")} />

          <a href="tel:4165550100" className={cn("hover:text-primary transition-colors", isTransparent ? "text-white/70" : "text-foreground/60")} aria-label="Call us">
            <Phone className="h-4 w-4" />
          </a>
          <a href="mailto:hello@photobooth.com" className={cn("hover:text-primary transition-colors", isTransparent ? "text-white/70" : "text-foreground/60")} aria-label="Email us">
            <Mail className="h-4 w-4" />
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className={cn(
              "h-10 px-6 text-[11px] tracking-[0.2em] uppercase font-medium border transition-colors flex items-center",
              isTransparent
                ? "border-white/40 text-white hover:bg-white hover:text-foreground"
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            )}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn("lg:hidden p-2 transition-colors", isTransparent ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("lg:hidden overflow-hidden transition-all duration-300 border-t border-border/30 bg-background", mobileMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 border-t-0")}>
        <nav className="overflow-y-auto max-h-[80vh] py-2">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={cn("block px-4 py-3 text-sm font-semibold uppercase tracking-wider", isActive("/") ? "text-primary" : "text-foreground/70")}>
            Home
          </Link>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className={cn("block px-4 py-3 text-sm font-semibold uppercase tracking-wider", isActive("/gallery") ? "text-primary" : "text-foreground/70")}>
            Gallery
          </Link>
          <Link to="/packages" onClick={() => setMobileMenuOpen(false)} className={cn("block px-4 py-3 text-sm font-semibold uppercase tracking-wider", isActive("/packages") ? "text-primary" : "text-foreground/70")}>
            Packages
          </Link>
          <div className="my-1 border-t border-border/20" />
          {renderMobileSection("Services", servicesLinks)}
          {renderMobileSection("About", aboutLinks)}
          <div className="mt-2 border-t border-border/20 px-4 py-4">
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-center text-sm font-semibold uppercase tracking-wider text-primary">
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
