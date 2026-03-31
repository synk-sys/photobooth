import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const features = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    title: "Weddings",
    subtitle: "Your Perfect Day, Captured",
    description: "Elegant open-air and enclosed booths designed to complement your wedding aesthetic.",
    link: "/services",
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    title: "Corporate Events",
    subtitle: "Branded & Professional",
    description: "Custom-branded booths with logo overlays and instant digital sharing for your team.",
    link: "/services",
  },
  {
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    title: "Birthday Parties",
    subtitle: "Make Every Moment Count",
    description: "Fun props, custom backdrops, and instant prints that guests love to take home.",
    link: "/services",
  },
  {
    image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&q=80",
    title: "Special Occasions",
    subtitle: "Any Event, Any Style",
    description: "From galas to graduations, our booths elevate every celebration with lasting memories.",
    link: "/services",
  },
];

const FeatureCards = () => {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden section-divider">
      <div className="container">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-primary/40" />
            <p className="text-primary font-body text-sm tracking-[0.35em] uppercase font-medium">
              An Unforgettable Experience
            </p>
            <span className="h-px w-10 bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
            What Would You Like<br className="hidden sm:block" /> to Celebrate?
          </h2>
          <p className="mt-7 text-[15px] text-muted-foreground max-w-lg mx-auto font-body leading-relaxed font-light">
            We bring premium photobooth experiences to every event — leaving guests with
            beautiful memories they'll treasure forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="group block">
              <div className="relative h-[380px] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-9">
                  <p className="text-white/80 font-body text-[10px] tracking-[0.35em] uppercase font-medium mb-2">
                    {feature.subtitle}
                  </p>
                  <h3 className="font-display text-3xl font-semibold text-white mb-3 leading-snug drop-shadow-lg">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm font-body leading-relaxed mb-6 max-w-[280px] font-light">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2.5 text-primary text-[11px] font-medium font-body tracking-[0.2em] uppercase opacity-0 translate-y-3 transition-all duration-600 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
