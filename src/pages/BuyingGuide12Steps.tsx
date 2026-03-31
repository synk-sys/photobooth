import ArticleLayout from "@/components/ArticleLayout";
import AnimatedSection from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Home, DollarSign, MapPin, Users, Search, FileText, Scale, FileCheck, Building, ClipboardCheck, Truck, PartyPopper } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Make Sure You're Ready to Buy",
    icon: CheckCircle2,
    content: (
      <>
        <p className="mb-4">Before you begin, make sure three key elements are ready: you, your finances, and the real estate market.</p>
        
        <h4 className="font-semibold text-lg mb-2">Are you ready?</h4>
        <p className="mb-4">Owning a home brings pride, stability, and independence. However, it also comes with responsibility. Beyond mortgage payments, homeowners must budget time and money for ongoing maintenance, repairs, and upkeep. True pride of ownership includes accountability and long-term commitment.</p>
        
        <h4 className="font-semibold text-lg mb-2">Is your bank account ready?</h4>
        <p className="mb-2">Your first home will likely be the largest financial obligation of your life. Ideally, you should:</p>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Be comfortable managing debt such as credit cards or student loans</li>
          <li>Have a consistent saving habit</li>
          <li>Have funds set aside for a down payment and closing costs</li>
        </ul>
        <p className="mb-4">You may also want to speak with your financial institution about programs such as the Home Buyers' Plan.</p>
        
        <h4 className="font-semibold text-lg mb-2">Is now a good time to buy?</h4>
        <p className="mb-4">Real estate markets rise and fall, and even experts cannot predict exact highs or lows. If you are buying a home as a long-term investment and place to live, short-term market fluctuations matter far less. Historically, real estate has increased in value over time.</p>
        <p>Choose a home that meets your family's needs and enjoy living in your investment as it grows.</p>
      </>
    ),
  },
  {
    number: 2,
    title: "Figure Out How Much You Can Afford",
    icon: DollarSign,
    content: (
      <>
        <p className="mb-4">Before house hunting, it is essential to understand your true budget.</p>
        
        <h4 className="font-semibold text-lg mb-2">Why this matters</h4>
        <p className="mb-4">A home is likely the most expensive purchase you will ever make. Many costs are not immediately obvious, and most buyers rely on financing.</p>
        
        <h4 className="font-semibold text-lg mb-2">The true cost of buying a home</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h5 className="font-medium mb-2">One-time costs</h5>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Down payment</li>
              <li>Legal fees</li>
              <li>Home inspection fees</li>
              <li>Taxes</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Monthly costs</h5>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Mortgage payments</li>
              <li>Utilities</li>
              <li>Maintenance</li>
              <li>Insurance</li>
              <li>Property taxes</li>
            </ul>
          </div>
        </div>
        
        <h4 className="font-semibold text-lg mb-2">How lenders calculate affordability</h4>
        <p className="mb-2">Lenders use two key guidelines:</p>
        <ul className="list-disc list-inside mb-4 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Gross Debt Service (GDS):</strong> Monthly housing costs should not exceed 32% of your gross monthly income.</li>
          <li><strong className="text-foreground">Total Debt Service (TDS):</strong> Monthly housing costs plus all other debt payments should not exceed 40% of your gross monthly income.</li>
        </ul>
        <p>These ratios determine how much a bank is willing to lend.</p>
      </>
    ),
  },
  {
    number: 3,
    title: "Decide What You Want to Buy",
    icon: MapPin,
    content: (
      <>
        <h4 className="font-semibold text-lg mb-2">Choose where you want to live</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li><strong className="text-foreground">Urban:</strong> Walkable, close to amenities, typically higher prices</li>
          <li><strong className="text-foreground">Suburban:</strong> Larger homes, newer schools, longer commutes</li>
          <li><strong className="text-foreground">Smaller cities and towns:</strong> Lower costs and self-contained communities</li>
          <li><strong className="text-foreground">Rural:</strong> Privacy, land ownership, and seclusion</li>
        </ul>
        
        <h4 className="font-semibold text-lg mb-2">Choose the type of home</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li><strong className="text-foreground">Single-family detached:</strong> Stand-alone home</li>
          <li><strong className="text-foreground">Semi-detached:</strong> Two homes sharing a wall</li>
          <li><strong className="text-foreground">Duplex / Triplex:</strong> Multiple units within one structure</li>
          <li><strong className="text-foreground">Townhouse:</strong> Homes joined in a row, may include fees</li>
          <li><strong className="text-foreground">Condominium:</strong> Individual unit ownership plus shared common areas</li>
        </ul>
        
        <h4 className="font-semibold text-lg mb-2">Condo ownership basics</h4>
        <p className="mb-4">Condo owners own their unit and share ownership of common areas such as hallways, elevators, and amenities. Monthly condo fees cover maintenance and operations.</p>
        
        <h4 className="font-semibold text-lg mb-2">New home vs resale</h4>
        <p className="mb-4">Resale homes offer character and possible upgrades but require careful inspection. New homes allow customization but may involve construction delays, settling, and post-move adjustments.</p>
        <p className="mb-4">Always have contracts reviewed and conduct a full inspection before final acceptance.</p>
        
        <h4 className="font-semibold text-lg mb-2">Needs vs wants</h4>
        <p>Focus first on needs (bedrooms, bathrooms, space). Then consider wants (upgrades, finishes, features). The goal is to meet all needs and as many wants as possible within budget.</p>
      </>
    ),
  },
  {
    number: 4,
    title: "Find a Realtor That Is Right for You",
    icon: Users,
    content: (
      <>
        <p className="mb-4">A REALTOR is a trained professional who represents your interests and guides you through the buying process.</p>
        
        <h4 className="font-semibold text-lg mb-2">REALTOR expertise</h4>
        <p className="mb-4">Licensed REALTORS follow a strict Code of Ethics and belong to professional real estate associations.</p>
        
        <h4 className="font-semibold text-lg mb-2">Types of REALTOR relationships</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li><strong className="text-foreground">Seller Agency:</strong> Represents the seller only</li>
          <li><strong className="text-foreground">Buyer Agency:</strong> Represents the buyer exclusively</li>
          <li><strong className="text-foreground">Dual Agency:</strong> Represents both buyer and seller with informed consent</li>
        </ul>
        
        <h4 className="font-semibold text-lg mb-2">How a REALTOR helps you</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Understand market conditions</li>
          <li>Access MLS listings</li>
          <li>Schedule and attend showings</li>
          <li>Negotiate offers</li>
          <li>Prepare contracts</li>
        </ul>
        <p>Working with one REALTOR consistently ensures better results and smoother communication.</p>
      </>
    ),
  },
  {
    number: 5,
    title: "See What's Out There",
    icon: Search,
    content: (
      <>
        <p className="mb-4">Begin your search by reviewing listings online and in person.</p>
        
        <h4 className="font-semibold text-lg mb-2">Smart house-hunting tips</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Visit neighborhoods during day and night</li>
          <li>Attend open houses</li>
          <li>Observe nearby schools, shopping, and transit</li>
          <li>Watch for noise, industry, or environmental concerns</li>
        </ul>
        <p>Stay objective. Attractive features should not distract from structural condition or budget suitability.</p>
      </>
    ),
  },
  {
    number: 6,
    title: "Sell Your Current Home (If Applicable)",
    icon: Home,
    content: (
      <>
        <p className="mb-4">If you already own a home, you may need to sell before buying another.</p>
        
        <h4 className="font-semibold text-lg mb-2">Market conditions</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li><strong className="text-foreground">Seller's market:</strong> More buyers than homes</li>
          <li><strong className="text-foreground">Buyer's market:</strong> More homes than buyers</li>
        </ul>
        <p className="mb-4">If you are both selling and buying, market timing often balances out.</p>
        
        <h4 className="font-semibold text-lg mb-2">Buy first or sell first?</h4>
        <p>Many buyers include conditions allowing the purchase to proceed only after their current home sells. REALTORS can help coordinate timing and negotiations.</p>
      </>
    ),
  },
  {
    number: 7,
    title: "Add a Lawyer to Your Team",
    icon: Scale,
    content: (
      <>
        <p className="mb-4">Real estate transactions involve complex legal documentation.</p>
        
        <h4 className="font-semibold text-lg mb-2">Your lawyer's role</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Review contracts</li>
          <li>Conduct title searches</li>
          <li>Transfer ownership</li>
          <li>Protect against legal risks</li>
        </ul>
        <p>Ask questions freely—explaining legal language is part of their job.</p>
      </>
    ),
  },
  {
    number: 8,
    title: "Make an Offer",
    icon: FileText,
    content: (
      <>
        <p className="mb-4">Once you find the right home, it's time to submit an offer.</p>
        
        <h4 className="font-semibold text-lg mb-2">Key offer components</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Purchase price</li>
          <li>Deposit</li>
          <li>Conditions (financing, inspection)</li>
          <li>Included fixtures and appliances</li>
          <li>Closing date</li>
        </ul>
        <p>Offers may be accepted, rejected, or countered. Negotiation is common.</p>
      </>
    ),
  },
  {
    number: 9,
    title: "Arrange a Mortgage",
    icon: Building,
    content: (
      <>
        <p className="mb-4">A mortgage enables you to purchase your home.</p>
        
        <h4 className="font-semibold text-lg mb-2">Where to look</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Banks and credit unions</li>
          <li>Mortgage brokers</li>
          <li>Assumable seller mortgages</li>
        </ul>
        
        <h4 className="font-semibold text-lg mb-2">Important mortgage terms</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li><strong className="text-foreground">Mortgage term:</strong> Length of agreement</li>
          <li><strong className="text-foreground">Amortization:</strong> Total repayment period</li>
          <li><strong className="text-foreground">Interest rate:</strong> Cost of borrowing</li>
        </ul>
        <p>Plan for additional costs such as appraisals, insurance, taxes, and legal fees.</p>
      </>
    ),
  },
  {
    number: 10,
    title: "Find a Home Inspector",
    icon: ClipboardCheck,
    content: (
      <>
        <p className="mb-4">A professional home inspection identifies issues before you buy.</p>
        
        <h4 className="font-semibold text-lg mb-2">What inspectors check</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Roof and foundation</li>
          <li>Plumbing and electrical systems</li>
          <li>Insulation and structure</li>
          <li>Safety hazards and pests</li>
        </ul>
        <p>Attend the inspection if possible and review the written report carefully.</p>
      </>
    ),
  },
  {
    number: 11,
    title: "Close the Deal",
    icon: FileCheck,
    content: (
      <>
        <p className="mb-4">Before closing day:</p>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Satisfy all offer conditions</li>
          <li>Finalize mortgage and insurance</li>
          <li>Sign legal documents</li>
          <li>Arrange utilities and address changes</li>
        </ul>
        <p>On closing day, ownership officially transfers and you receive the keys.</p>
      </>
    ),
  },
  {
    number: 12,
    title: "Move In",
    icon: Truck,
    content: (
      <>
        <p className="mb-4">Plan your move early and carefully.</p>
        
        <h4 className="font-semibold text-lg mb-2">Moving tips</h4>
        <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground">
          <li>Book movers in advance</li>
          <li>Pack early and label boxes</li>
          <li>Declutter before moving</li>
        </ul>
        <p>After moving in, take time to understand your home and budget before making major changes.</p>
      </>
    ),
  },
];

const BuyingGuide12Steps = () => {
  return (
    <ArticleLayout
      title="A 12-Step Guide to Buying Your Home"
      subtitle="Buying a home is one of the most important financial and personal decisions you will ever make. This step-by-step guide is designed to help you understand the process clearly—from preparation to moving day."
      backTo="/buying-tips"
      backLabel="Back to Buying Tips"
      
      cta={{
        title: "Ready to Start Your Home Buying Journey?",
        description: "Let us help you find your dream home with expert guidance every step of the way.",
        linkTo: "/dream-home-finder",
        linkLabel: "Start Your Search",
      }}
    >
      <div className="space-y-6">
        {steps.map((step) => {
          return (
            <AnimatedSection key={step.number} delay={0.05 * Math.min(step.number, 4)}>
              <Card className="article-card overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary font-display text-lg font-bold">
                      {step.number}
                    </div>
                    <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                      {step.title}
                    </h2>
                  </div>
                  <div className="pl-[3.75rem] text-foreground font-body font-light leading-relaxed">
                    {step.content}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Congratulations */}
      <AnimatedSection className="mt-14" variant="scale">
        <div className="article-cta rounded-sm p-10 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
            <PartyPopper className="h-7 w-7" />
          </div>
          <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
            Congratulations!
          </h2>
          <p className="text-muted-foreground font-body font-light max-w-2xl mx-auto mb-6">
            You are now a homeowner. Enjoy the stability, pride, and opportunity that comes with owning your home.
          </p>
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4 rotate-90" />
            Return to Top
          </Button>
        </div>
      </AnimatedSection>
    </ArticleLayout>
  );
};

export default BuyingGuide12Steps;
