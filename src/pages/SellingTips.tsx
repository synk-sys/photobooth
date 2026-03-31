import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

import selling10StepGuide from "@/assets/tips/selling-10-step-guide.jpg";
import selling10Questions from "@/assets/tips/selling-10-questions.jpg";
import sellingAloneOrRealtor from "@/assets/tips/selling-alone-or-realtor.jpg";
import sellingPreparationChecklist from "@/assets/tips/selling-preparation-checklist.jpg";
import sellingListingHome from "@/assets/tips/selling-listing-home.jpg";
import sellingRealtorExpectations from "@/assets/tips/selling-realtor-expectations.jpg";
import sellingRealtorCommitment from "@/assets/tips/selling-realtor-commitment.jpg";
import sellingImportantDocuments from "@/assets/tips/selling-important-documents.jpg";


const sellingTips = [
  {
    title: "10-Step Guide to Selling Your Home",
    description: "A comprehensive step-by-step guide to help you navigate the home selling process from start to finish.",
    image: selling10StepGuide,
    internalUrl: "/selling-tips/10-step-guide",
    readTime: "7 min read",
  },
  {
    title: "10 Questions to Ask When Hiring a REALTOR",
    description: "Essential questions to help you find the right real estate professional for your needs.",
    image: selling10Questions,
    internalUrl: "/selling-tips/10-questions",
    readTime: "5 min read",
  },
  {
    title: "Do it Alone or Use a Realtor",
    description: "Understand the pros and cons of selling your home yourself versus working with a professional.",
    image: sellingAloneOrRealtor,
    internalUrl: "/selling-tips/alone-or-realtor",
    readTime: "6 min read",
  },
  {
    title: "Home Preparation Checklist",
    description: "A detailed checklist to ensure your home is ready to impress potential buyers.",
    image: sellingPreparationChecklist,
    internalUrl: "/selling-tips/preparation-checklist",
    readTime: "4 min read",
  },
  {
    title: "Listing Your Home",
    description: "Learn how to effectively list your home to attract the right buyers and maximize exposure.",
    image: sellingListingHome,
    internalUrl: "/selling-tips/listing-home",
    readTime: "5 min read",
  },
  {
    title: "What to Expect From Your Realtor",
    description: "Understand the services and support you should receive from your real estate agent.",
    image: sellingRealtorExpectations,
    internalUrl: "/selling-tips/realtor-expectations",
    readTime: "5 min read",
  },
  {
    title: "The Realtor Commitment",
    description: "Learn about the professional standards and commitment you can expect from a REALTOR.",
    image: sellingRealtorCommitment,
    internalUrl: "/selling-tips/realtor-commitment",
    readTime: "3 min read",
  },
  {
    title: "Important Documents",
    description: "Essential documents you need to have ready when selling your home to agents, lawyers, and buyers.",
    image: sellingImportantDocuments,
    internalUrl: "/selling-tips/important-documents",
    readTime: "4 min read",
  },
];

const SellingTips = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Selling Tips
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Expert advice and resources to help you sell your home quickly and for the best possible price.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sellingTips.map((tip, index) => (
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
                Ready to Sell Your Home?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get a free home valuation and personalized selling strategy from Sanjeev Manocha.
              </p>
              <a
                href="/home-valuation"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Get Your Free Home Valuation
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellingTips;
