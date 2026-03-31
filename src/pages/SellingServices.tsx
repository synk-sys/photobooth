import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleLayout from "@/components/ArticleLayout";

import pricingStrategyImg from "@/assets/selling/pricing-strategy.jpg";
import professionalMarketingImg from "@/assets/selling/professional-marketing.jpg";
import propertyPreparationImg from "@/assets/selling/property-preparation.jpg";
import marketExposureImg from "@/assets/selling/market-exposure.jpg";
import offerManagementImg from "@/assets/selling/offer-management.jpg";
import transactionManagementImg from "@/assets/selling/transaction-management.jpg";
import afterSaleSupportImg from "@/assets/selling/after-sale-support.jpg";

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

const sellingServiceCategories: ServiceCategory[] = [
  {
    category: "Pricing & Market Strategy",
    image: pricingStrategyImg,
    services: [
      {
        title: "Property Evaluation & Pricing Strategy",
        description: "A detailed evaluation of your property combined with data-driven pricing to position your home competitively in the market.",
      },
      {
        title: "Comparative Market Analysis (CMA)",
        description: "A comprehensive analysis of comparable properties to determine the most accurate market value.",
      },
      {
        title: "Pricing Strategy Based on Market Data",
        description: "We analyze recent sales, buyer demand, and market conditions to determine the optimal listing price.",
      },
      {
        title: "Timing Strategy to Maximize Price",
        description: "Strategic listing timing helps attract the highest number of buyers and maximize sale value.",
      },
    ],
  },
  {
    category: "Professional Marketing",
    image: professionalMarketingImg,
    services: [
      {
        title: "Cinematic Video Tours",
        description: "Engaging video tours allow buyers to experience the property before they visit in person.",
      },
      {
        title: "Drone Photography (Where Permited)",
        description: "Aerial photography that highlights your property's lot, surroundings, and neighbourhood from stunning perspectives.",
      },
      {
        title: "3D Virtual Tours",
        description: "Interactive virtual tours allow buyers to explore the home remotely from anywhere.",
      },
      {
        title: "Social Media Advertising",
        description: "Targeted ad campaigns across Facebook, Instagram, and other platforms to reach the right buyers at the right time.",
      },
      {
        title: "Featured MLS Exposure",
        description: "Premium placement on MLS with professional photos, detailed descriptions, and enhanced listing features to ensures your property receives maximum visibility among agents and buyers",
      },
    ],
  },
  {
    category: "Property Preparation",
    image: propertyPreparationImg,
    services: [
      {
        title: "Home Staging Consultation",
        description: "Professional staging guidance to present your home in the most attractive way possible.",
      },
      {
        title: "Renovation & Improvement Advice",
        description: "Guidance on cost-effective improvements that increase your home's value and return on investment.",
      },
      {
        title: "Decluttering & Presentation Guidance",
        description: "Step-by-step guidance to decluttering and strategies to make your home appear clean, spacious, and inviting for maximum buyer appeal.",
      },
    ],
  },
  {
    category: "Maximum Market Exposure",
    image: marketExposureImg,
    services: [
      {
        title: "MLS Listing on TRREB",
        description: "Your property listed on the Toronto Regional Real Estate Board, reaching thousands of active agents and buyers.",
      },
      {
        title: "Realtor.ca Exposure",
        description: "National visibility on Canada's most-visited real estate platform, attracting buyers from across the country.",
      },
      {
        title: "Targeted Digital Marketing Campaigns",
        description: "Data-driven online campaigns designed to generate qualified leads and maximize your property's visibility.",
      },
      {
        title: "Email Marketing to Buyer Database",
        description: "Direct outreach of your property to a network of buyers and real estate professionals.",
      },
      {
        title: "Market Report",
        description: "Stay informed with the latest market trends, statistics, and insights for the Greater Toronto Area.",
      },
    ],
  },
  {
    category: "Offer Management",
    image: offerManagementImg,
    services: [
      {
        title: "Strategic Offer Date Planning",
        description: "Carefully timed offer dates to create competitive conditions and drive the highest possible sale price.",
      },
      {
        title: "Multiple Offer Negotiation",
        description: "Skilled negotiation in multiple-offer scenarios to secure the best price, terms, and conditions for you.",
      },
      {
        title: "Transparent Offer Presentation",
        description: "Clear organization and presentation of all offers with expert analysis to help you make informed decisions.",
      },
    ],
  },
  {
    category: "Transaction Management",
    image: transactionManagementImg,
    services: [
      {
        title: "Paperwork & Legal Compliance",
        description: "Meticulous handling of all documentation to ensure legal accuracy and compliance.",
      },
      {
        title: "Coordination with Lawyers",
        description: "Seamless coordination with your legal team to ensure a smooth closing process from start to finish.",
      },
      {
        title: "Closing Management",
        description: "End-to-end management of the closing process, ensuring all conditions are met and deadlines are honoured.",
      },
    ],
  },
  {
    category: "After Sale Support",
    image: afterSaleSupportImg,
    services: [
      {
        title: "Moving Support Recommendations",
        description: "Access to trusted moving companies and relocation services.",
      },
      {
        title: "Utility Transfer Guidance",
        description: "Step-by-step assistance with transferring utilities, mail forwarding, and address updates.",
      },
      {
        title: "Investment Reinvestment Advice",
        description: "Strategic guidance on reinvesting your sale proceeds into your next property or investment opportunity.",
      },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const SellingServices = () => {
  return (
    <ArticleLayout
      hideTextToSpeech
      title="Selling Services"
      subtitle="From evaluation & pricing strategy to closing — expert support to sell your home quickly and at the best price."
      backTo="/"
      backLabel="Back to Home"
      cta={{
        title: "Ready to Sell Your Home?",
        description: "Contact Sanjeev Manocha for a complimentary home evaluation and selling strategy.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-20">
        {sellingServiceCategories.map((category, catIndex) => (
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

export default SellingServices;
