import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import {
  Home, Clock, FileText,
  Building, TrendingUp, CheckCircle, DollarSign, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const MortgageGuide = () => {
  return (
    <ArticleLayout
      title="Complete Mortgage Guide"
      subtitle="Everything you need to know about mortgages, from understanding the basics to getting approved for your home loan."
      backTo="/"
      backLabel="Back to Home"
      hideTextToSpeech
      maxWidth="max-w-4xl"
    >
      {/* Quick Navigation */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {["what-is-mortgage", "qualifying", "types", "interest-rates", "pre-approval", "credit-scores", "glossary"].map((id) => (
          <a key={id} href={`#${id}`} className="px-4 py-2 rounded-sm border border-border/50 text-xs font-body font-medium uppercase tracking-[0.15em] text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            {id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </a>
        ))}
      </div>

      {/* What is a Mortgage */}
      <div id="what-is-mortgage" className="article-card rounded-sm p-8 md:p-10 mb-10 scroll-mt-24">
        <h2 className="font-display text-xl font-semibold mb-6">What is a Mortgage?</h2>
        <div className="space-y-4 text-muted-foreground font-body font-light leading-relaxed">
          <p>A mortgage is a legal and binding contract between you and a lender, which outlines the terms of a loan secured by a property. The price of a home is often more than what a single individual or household can save, so most buyers put down a deposit (typically 20%) and obtain a loan for the remaining amount.</p>
          <p>Mortgage payments include the <strong className="text-foreground">principal</strong> (amount borrowed) and <strong className="text-foreground">interest</strong> (charge for borrowing). Payments can be made monthly, bi-weekly, or weekly.</p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-sm border border-primary/20 bg-primary/5 p-4">
              <h4 className="font-body font-semibold mb-2 flex items-center gap-2"><Building className="h-4 w-4 text-primary" />Where to Get a Mortgage</h4>
              <ul className="text-sm space-y-1">
                <li>• Banks</li><li>• Mortgage companies</li><li>• Trust companies</li><li>• Credit unions</li><li>• Mortgage brokers</li>
              </ul>
            </div>
            <div className="rounded-sm border border-primary/20 bg-primary/5 p-4">
              <h4 className="font-body font-semibold mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" />Requirements</h4>
              <ul className="text-sm space-y-1">
                <li>• Good credit score</li><li>• Bank & investment statements</li><li>• Recent tax returns</li><li>• Proof of employment</li><li>• Down payment funds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Key Mortgage Features */}
      <div className="mb-10">
        <h2 className="font-display text-2xl font-semibold text-center mb-8">Key Features of a Mortgage</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Clock, title: "Your Term", text: "Your mortgage term is the duration your mortgage contract is in effect, including interest rate and payment schedule. Terms can range from months to five years or more." },
            { icon: DollarSign, title: "Principal Amount", text: "The principal is the sum borrowed from the lender to purchase the home. It includes the purchase price minus your down payment." },
            { icon: TrendingUp, title: "Amortization", text: "The total time it takes to repay your mortgage completely. The average Canadian takes 25 to 30 years." },
            { icon: FileText, title: "Payment Frequency", text: "Monthly, semi-monthly, biweekly, or weekly. Accelerated payments save interest over time." },
          ].map((item) => (
            <div key={item.title} className="article-card rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <item.icon className="h-5 w-5 text-primary" />
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Qualifying */}
      <div id="qualifying" className="article-card rounded-sm p-8 md:p-10 mb-10 scroll-mt-24">
        <h2 className="font-display text-xl font-semibold mb-6">Qualifying for a Mortgage</h2>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">The mortgage lender will evaluate your application based on several key factors.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-body font-semibold mb-3">What Lenders Consider:</h4>
            <ul className="space-y-2 text-sm font-body font-light">
              {["Marital status and dependents", "Age and employment history", "Salary and income sources", "Assets (vehicles, cash, investments)", "Liabilities (credit cards, car loans)", "Credit history and payment record"].map((t) => (
                <li key={t} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold mb-3">Pre-Approval Benefits:</h4>
            <ul className="space-y-2 text-sm font-body font-light">
              {["Know your maximum mortgage amount", "Locked-in interest rate for 60-130 days", "Stronger negotiating position", "Faster closing process", "Protection from rate increases"].map((t) => (
                <li key={t} className="flex items-start gap-2"><ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interest Rates */}
      <div id="interest-rates" className="mb-10 scroll-mt-24">
        <h2 className="font-display text-2xl font-semibold text-center mb-4">Understanding Interest Rates</h2>
        <p className="text-center text-muted-foreground font-body font-light mb-8">The interest rate is the fee you pay to the lender for borrowing money.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Fixed Rate", text: "Remains stable throughout the term. Provides payment certainty.", best: "Budget stability" },
            { title: "Variable Rate", text: "Can fluctuate based on the prime rate. Usually lower initially.", best: "Rate decrease expectations" },
            { title: "Hybrid Rate", text: "Combines both fixed and variable rates. Part fixed, part variable.", best: "Balanced protection" },
          ].map((item) => (
            <div key={item.title} className="article-card rounded-sm p-6">
              <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body font-light mb-2">{item.text}</p>
              <p className="text-xs text-primary font-body font-medium">Best for: {item.best}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Types of Mortgages */}
      <div id="types" className="mb-10 scroll-mt-24">
        <h2 className="font-display text-2xl font-semibold text-center mb-8">Types of Mortgages</h2>
        <div className="space-y-4">
          {[
            { title: "Open Mortgage", text: "Allows you to repay at any time without penalty. Interest rates are typically 1% higher than closed mortgages.", best: "Those planning to sell soon or pay off early." },
            { title: "Closed Mortgage", text: "Lower interest rates with terms from 6 months to 10 years. Allows up to 20% prepayment annually.", best: "Those keeping the property for the full term." },
            { title: "Fixed Term Mortgage", text: "Interest rate is established for the entire term, so your monthly payment remains unchanged.", best: "When rates are low." },
            { title: "Adjustable Rate Mortgage (ARM)", text: "Rate is based on prime and can change monthly. Very flexible with no penalties for early payoff.", best: "When interest rates are expected to decline." },
            { title: "Portable Mortgage", text: "Allows you to transfer your mortgage balance, terms, and interest rate when you sell and buy another home.", best: "Avoiding prepayment penalties." },
            { title: "Secured Lines of Credit (HELOC)", text: "Use your home equity for investments, renovations, or other purposes with rates as low as prime. Up to 75% of property value.", best: "Flexible credit access." },
          ].map((item) => (
            <div key={item.title} className="article-card rounded-sm p-6">
              <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
              <p className="mt-2 text-xs font-body"><strong>Best for:</strong> {item.best}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Approval */}
      <div id="pre-approval" className="article-card rounded-sm p-8 md:p-10 mb-10 scroll-mt-24">
        <h2 className="font-display text-xl font-semibold mb-6">Mortgage Pre-Approval</h2>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">We strongly recommend getting a mortgage pre-approval <strong className="text-foreground">before</strong> looking for a home.</p>
        <div className="rounded-sm border border-primary/20 bg-primary/5 p-6">
          <h4 className="font-body font-semibold mb-4">A pre-approval will tell you:</h4>
          <ul className="space-y-3">
            {["The maximum mortgage amount you're eligible for", "Approximately how much your mortgage payments will be", "A locked-in interest rate for 60 to 130 days"].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm font-body font-light">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Credit Scores */}
      <div id="credit-scores" className="article-card rounded-sm p-8 md:p-10 mb-10 scroll-mt-24">
        <h2 className="font-display text-xl font-semibold mb-6">Understanding Credit Scores</h2>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">Your credit score helps lenders determine whether to extend credit and at what rate.</p>
        <div className="overflow-x-auto rounded-sm border">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Score Range</TableHead><TableHead>Rating</TableHead><TableHead>Impact</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {[
                { score: "780+", rating: "Perfect", color: "text-green-600", impact: "Best rates and terms available" },
                { score: "720 - 780", rating: "Excellent", color: "text-green-500", impact: "Very competitive rates" },
                { score: "675 - 720", rating: "Average", color: "text-blue-500", impact: "Standard rates and options" },
                { score: "620 - 690", rating: "Fair", color: "text-yellow-600", impact: "Higher rates, limited options" },
                { score: "Below 620", rating: "Low", color: "text-red-500", impact: "Difficult to qualify" },
              ].map((row) => (
                <TableRow key={row.score}>
                  <TableCell className="font-body font-medium">{row.score}</TableCell>
                  <TableCell className={`${row.color} font-body font-medium`}>{row.rating}</TableCell>
                  <TableCell className="font-body font-light">{row.impact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Glossary */}
      <div id="glossary" className="mb-10 scroll-mt-24">
        <h2 className="font-display text-2xl font-semibold text-center mb-8">Mortgage Glossary</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Common Fees", items: ["Application Fee: Money paid to the lender for processing.", "Origination Fee: A fee charged when initiating the loan.", "Closing Costs: Various expenses beyond the property price.", "Insurance: Homeowner's coverage for fire and casualty protection."] },
            { title: "Down Payment", items: ["Most loans are based on a 20% down payment, though options exist for as little as 5%. If less than 20% is put down, lenders usually require Private Mortgage Insurance (PMI)."] },
            { title: "Amortization", items: ["Paying off the mortgage debt in regular installments over time (25-30 years). Making additional payments reduces your term and total interest paid."] },
            { title: "Interest Rate vs. APR", items: ["The interest rate is the monthly cost of borrowing. The APR (Annual Percentage Rate) includes the interest rate plus points, fees, and other costs."] },
          ].map((section) => (
            <div key={section.title} className="article-card rounded-sm p-6">
              <h3 className="font-display text-base font-semibold mb-3">{section.title}</h3>
              <div className="text-sm text-muted-foreground font-body font-light space-y-2">
                {section.items.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator CTA */}
      <div className="rounded-sm bg-primary text-primary-foreground p-10 text-center mb-10">
        <h2 className="font-display text-xl font-semibold mb-4">Ready to Calculate Your Mortgage?</h2>
        <p className="mb-8 opacity-90 font-body font-light max-w-xl mx-auto text-sm">Use our mortgage calculator to estimate your monthly payments and see what you can afford.</p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/mortgage-calculator">Mortgage Calculator</Link>
        </Button>
      </div>
    </ArticleLayout>
  );
};

export default MortgageGuide;
