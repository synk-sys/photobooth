import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

import buying12StepGuide from "@/assets/tips/buying-12-step-guide.jpg";
import buyingLandTransferTax from "@/assets/tips/buying-land-transfer-tax.jpg";
import buyingGovernmentPrograms from "@/assets/tips/buying-government-programs.jpg";
import buyingDreamHomeChecklist from "@/assets/tips/buying-dream-home-checklist.jpg";
import buyingTitleInsurance from "@/assets/tips/buying-title-insurance.jpg";
import buyingHouseHunting from "@/assets/tips/buying-house-hunting.jpg";
import buyingRealtorExpectations from "@/assets/tips/buying-realtor-expectations.jpg";
import buyingRealtorCommitment from "@/assets/tips/buying-realtor-commitment.jpg";

const buyingTips = [
  {
    title: "12-Step Guide to Buying Your Home",
    description: "A comprehensive step-by-step guide to navigate the home buying process from start to finish.",
    image: buying12StepGuide,
    internalUrl: "/buying-tips/12-step-guide",
    readTime: "8 min read",
  },
  {
    title: "Land Transfer Tax",
    description: "Understand land transfer tax requirements and calculations for your home purchase.",
    image: buyingLandTransferTax,
    internalUrl: "/buying-tips/land-transfer-tax",
    readTime: "5 min read",
  },
  {
    title: "Government Programs for Home Buyers",
    description: "Explore government incentives and programs available to help you purchase your home.",
    image: buyingGovernmentPrograms,
    internalUrl: "/buying-tips/government-programs",
    readTime: "6 min read",
  },
  {
    title: "Dream Home Checklist",
    description: "Create your perfect home wishlist to find the property that matches your needs.",
    image: buyingDreamHomeChecklist,
    internalUrl: "/buying-tips/dream-home-checklist",
    readTime: "4 min read",
  },
  {
    title: "Title Insurance",
    description: "Learn about title insurance and how it protects your investment.",
    image: buyingTitleInsurance,
    internalUrl: "/buying-tips/title-insurance",
    readTime: "5 min read",
  },
  {
    title: "House Hunting Checklist",
    description: "Essential checklist to evaluate properties during your house hunting journey.",
    image: buyingHouseHunting,
    internalUrl: "/buying-tips/house-hunting-checklist",
    readTime: "4 min read",
  },
  {
    title: "What to Expect From Your Realtor",
    description: "Understand the services and support your realtor should provide throughout the process.",
    image: buyingRealtorExpectations,
    internalUrl: "/buying-tips/realtor-expectations",
    readTime: "5 min read",
  },
  {
    title: "The Realtor Commitment",
    description: "Learn about the professional standards and commitments your realtor upholds.",
    image: buyingRealtorCommitment,
    internalUrl: "/buying-tips/realtor-commitment",
    readTime: "3 min read",
  },
];

const BuyingTips = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Buying Tips
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Essential resources and guides to help you navigate the home buying process with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {buyingTips.map((tip, index) => (
                <Link key={index} to={tip.internalUrl} className="group">
                  <article className="h-full overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:-translate-y-1">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={tip.image}
                        alt={tip.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{tip.readTime}</span>
                      </div>
                      <h2 className="text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {tip.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {tip.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Ready to Find Your Dream Home?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Let us help you navigate the home buying process with expert guidance and personalized service.
              </p>
              <a
                href="/dream-home-finder"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Start Your Search
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuyingTips;
