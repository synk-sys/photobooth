import { Link } from "react-router-dom";
import ArticleLayout from "@/components/ArticleLayout";

const services = [
  {
    title: "Selling Your Home",
    description: "Strategic marketing, professional staging advice, and expert negotiation to get you the best price for your property.",
    linkTo: "/selling-tips",
    linkLabel: "Selling Tips",
  },
  {
    title: "Buying a Home",
    description: "Personalized property search, neighbourhood insights, and guidance through every step of the buying process.",
    linkTo: "/buying-tips",
    linkLabel: "Buying Tips",
  },
  {
    title: "Leasing Services",
    description: "Comprehensive support for landlords and tenants — from listing and screening to lease agreements.",
    linkTo: "/leasing-services",
    linkLabel: "Learn More",
  },
  {
    title: "Home Valuation",
    description: "Get an accurate, up-to-date market evaluation of your property at no cost and with no obligation.",
    linkTo: "/home-valuation",
    linkLabel: "Get Your Valuation",
  },
  {
    title: "Dream Home Finder",
    description: "Tell us exactly what you're looking for and we'll match you with properties that fit your criteria.",
    linkTo: "/dream-home-finder",
    linkLabel: "Find Your Home",
  },
  {
    title: "Mortgage Assistance",
    description: "Access mortgage calculators, guides, and expert advice to help you secure the best financing for your home.",
    linkTo: "/mortgage-guide",
    linkLabel: "Mortgage Guide",
  },
];

const Services = () => {
  return (
    <ArticleLayout
      hideTextToSpeech
      title="Our Services"
      subtitle="Comprehensive real estate services tailored to your needs — whether you're buying, selling, or leasing."
      backTo="/"
      backLabel="Back to Home"
      cta={{
        title: "Ready to Get Started?",
        description: "Contact Sanjeev Manocha for personalized assistance with buying or selling your home.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
      maxWidth="max-w-5xl"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          return (
            <div key={service.title} className="article-card rounded-sm p-6 h-full flex flex-col">
              <h3 className="font-display text-base font-semibold text-foreground mb-4">{service.title}</h3>
              <p className="text-sm text-muted-foreground font-body font-light mb-4 flex-1">
                {service.description}
              </p>
              <Link
                to={service.linkTo}
                className="inline-flex items-center text-sm font-body font-medium text-primary hover:underline"
              >
                {service.linkLabel} →
              </Link>
            </div>
          );
        })}
      </div>
    </ArticleLayout>
  );
};

export default Services;
