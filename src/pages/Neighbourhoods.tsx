import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const Neighbourhoods = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary font-body text-sm tracking-[0.35em] uppercase font-medium">
            Featured
          </span>
          <span className="h-px w-12 bg-primary" />
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground">
          Neighbourhoods
        </h1>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area, index) => (
              <Link
                key={index}
                to={area.link}
                className="group relative block overflow-hidden h-56 md:h-64"
              >
                <img
                  src={area.image}
                  alt={`${area.name} properties`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/40 transition-colors duration-300 group-hover:bg-foreground/55" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground tracking-widest uppercase">
                    {area.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Neighbourhoods;
