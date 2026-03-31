import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleLayout from "@/components/ArticleLayout";

import homeSearchImg from "@/assets/buying/home-search.jpg";
import mortgageFinancingImg from "@/assets/buying/mortgage-financing.jpg";
import neighbourhoodExplorationImg from "@/assets/buying/neighbourhood-exploration.jpg";
import dueDiligenceImg from "@/assets/buying/due-diligence.jpg";
import offerNegotiationImg from "@/assets/buying/offer-negotiation.jpg";
import closingSupportImg from "@/assets/buying/closing-support.jpg";

interface ServiceItem {
  title: string;
  description: string;
  linkTo?: string;
  linkLabel?: string;
}

interface ServiceCategory {
  category: string;
  image: string;
  services: ServiceItem[];
}

const buyingServiceCategories: ServiceCategory[] = [
  {
    category: "Home Search & Consultation",
    image: homeSearchImg,
    services: [
      {
        title: "Personalized Property Search",
        description: "A tailored search based on your lifestyle, budget, and preferences to find the perfect home.",
      },
      {
        title: "Dream Home Finder",
        description: "Tell us exactly what you're looking for and we'll match you with properties that fit your criteria.",
        linkTo: "/dream-home-finder",
        linkLabel: "Find Your Home",
      },
      {
        title: "New Construction & Pre-Construction",
        description: "Access to exclusive new build and pre-construction opportunities across the Greater Toronto Area.",
      },
      {
        title: "Open House & Private Showings",
        description: "Coordinated property viewings at your convenience, including private showings and virtual tours.",
      },
    ],
  },
  {
    category: "Mortgage & Financing",
    image: mortgageFinancingImg,
    services: [
      {
        title: "Mortgage Pre-Approval Guidance",
        description: "Step-by-step assistance in getting pre-approved so you know your budget before you start looking.",
      },
      {
        title: "Mortgage Calculator",
        description: "Estimate your monthly payments, land transfer taxes, and closing costs with our easy-to-use calculator.",
        linkTo: "/mortgage-calculator",
        linkLabel: "Calculate Now",
      },
      {
        title: "Government Programs & Incentives",
        description: "Explore first-time buyer programs, rebates, and government incentives to maximize your savings.",
        linkTo: "/buying-tips/government-programs",
        linkLabel: "View Programs",
      },
      {
        title: "Land Transfer Tax Guidance",
        description: "Understand provincial and municipal land transfer tax requirements and available rebates.",
        linkTo: "/buying-tips/land-transfer-tax",
        linkLabel: "Learn More",
      },
    ],
  },
  {
    category: "Neighbourhood Exploration",
    image: neighbourhoodExplorationImg,
    services: [
      {
        title: "Community & Neighbourhood Insights",
        description: "In-depth knowledge of GTA communities including schools, amenities, transit, and lifestyle.",
        linkTo: "/neighbourhoods",
        linkLabel: "View Neighbourhoods",
      },
      {
        title: "School District Research",
        description: "Detailed information on school rankings, catchment areas, and educational options near your potential home.",
      },
      {
        title: "Market Report & Trends",
        description: "Stay informed with the latest market data, pricing trends, and neighbourhood statistics.",
        linkTo: "/market-report",
        linkLabel: "View Report",
      },
      {
        title: "Future Development Insights",
        description: "Information on upcoming developments, zoning changes, and infrastructure projects that may affect property values.",
      },
    ],
  },
  {
    category: "Due Diligence & Inspections",
    image: dueDiligenceImg,
    services: [
      {
        title: "Home Inspection Coordination",
        description: "Arranging thorough property inspections with trusted professionals to uncover any potential issues.",
      },
      {
        title: "Title Insurance",
        description: "Guidance on title insurance to protect your investment against title defects and fraud.",
        linkTo: "/buying-tips/title-insurance",
        linkLabel: "Learn More",
      },
      {
        title: "Property History & Disclosure Review",
        description: "Comprehensive review of property history, seller disclosures, and any known defects or issues.",
      },
      {
        title: "Condo Status Certificate Review",
        description: "Expert review of condo status certificates to identify financial health, rules, and potential red flags.",
      },
    ],
  },
  {
    category: "Offer & Negotiation",
    image: offerNegotiationImg,
    services: [
      {
        title: "Strategic Offer Preparation",
        description: "Crafting competitive offers based on market analysis, comparable sales, and property conditions.",
      },
      {
        title: "Expert Negotiation",
        description: "Skilled negotiation to secure the best possible price, terms, and conditions on your behalf.",
      },
      {
        title: "Multiple Offer Strategy",
        description: "Strategic guidance when competing in multiple-offer situations to give you the best chance of success.",
      },
      {
        title: "Condition Management",
        description: "Careful management of financing, inspection, and other conditions to protect your interests.",
      },
    ],
  },
  {
    category: "Closing & After-Purchase Support",
    image: closingSupportImg,
    services: [
      {
        title: "Closing Coordination",
        description: "End-to-end management of the closing process, ensuring all conditions are met and deadlines honoured.",
      },
      {
        title: "Lawyer & Legal Coordination",
        description: "Seamless coordination with your legal team for title transfers, mortgage registration, and closing documents.",
      },
      {
        title: "Moving & Utility Setup",
        description: "Trusted referrals for movers, cleaners, and guidance on utility transfers and address changes.",
      },
      {
        title: "Post-Purchase Support",
        description: "Ongoing support after your purchase, including contractor recommendations and future market advice.",
      },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const BuyingServices = () => {
  return (
    <ArticleLayout
      hideTextToSpeech
      title="Buying Services"
      subtitle="Expert guidance and tools to help you find and purchase your perfect home in the GTA."
      backTo="/"
      backLabel="Back to Home"
      cta={{
        title: "Ready to Find Your Dream Home?",
        description: "Contact Sanjeev Manocha for personalized assistance with buying your next home.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-20">
        {buyingServiceCategories.map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: catIndex * 0.05, ease }}
          >
            {/* Category Image */}
            <div className="relative w-full h-56 md:h-72 rounded-sm overflow-hidden mb-8">
              <img
                src={category.image}
                alt={category.category}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-white tracking-wide">
                  {category.category}
                </h2>
              </div>
            </div>

            {/* Service Cards */}
            <div className="grid gap-5 md:grid-cols-2">
              {category.services.map((service) => (
                <div
                  key={service.title}
                  className="article-card rounded-sm p-6 h-full flex flex-col"
                >
                  <h3 className="font-display text-base font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body font-light mb-4 flex-1">
                    {service.description}
                  </p>
                  {service.linkTo && (
                    <Link
                      to={service.linkTo}
                      className="inline-flex items-center text-sm font-body font-medium text-primary hover:underline"
                    >
                      {service.linkLabel || "Learn More"} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </ArticleLayout>
  );
};

export default BuyingServices;
