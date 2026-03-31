import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClosingCosts = () => {
  const lttRates = [
    { range: "≤ $55,000", rate: "0.5%" },
    { range: "$55,001 - $250,000", rate: "1.0%" },
    { range: "$250,001 - $400,000", rate: "1.5%" },
    { range: "$400,001 - $2,000,000", rate: "2.0%" },
    { range: "> $2,000,000", rate: "2.5%" },
  ];

  const sampleClosingCosts = [
    { item: "Ontario LTT", amount: "$8,475", note: "After $4,000 first-time homebuyer rebate" },
    { item: "Toronto LTT", amount: "$8,000", note: "After $4,475 first-time homebuyer rebate" },
    { item: "Legal Fees", amount: "$2,000", note: "Including disbursements" },
    { item: "Title Insurance", amount: "$400", note: "One-time fee" },
    { item: "Home Inspection", amount: "$500", note: "Optional but highly recommended" },
    { item: "Appraisal Fee", amount: "$400", note: "Often required by mortgage lender" },
    { item: "CMHC Insurance PST", amount: "$0", note: "8% PST on CMHC premium (only if <20% down)" },
    { item: "Adjustments & Prepaid Costs", amount: "$1,500", note: "Property taxes, utilities, or condo fees" },
  ];

  return (
    <ArticleLayout
      title="A Complete Guide to Closing Costs in Ontario"
      subtitle="Understanding the hidden costs of buying a home and how to budget for them."
      backTo="/buying-tips"
      backLabel="Back to Buying Tips"
      hideTextToSpeech
      maxWidth="max-w-4xl"
    >
      {/* Introduction */}
      <div className="-mt-14 rounded-sm border border-primary/20 bg-primary/5 p-8 md:p-10 mb-10">
        <div>
          <div>
            <h2 className="mb-2 font-display text-xl font-semibold">The Hidden Costs of Buying a Home</h2>
            <p className="text-muted-foreground font-body font-light leading-relaxed">
              After finding your perfect home and successfully negotiating your offer, it's time to understand the financial responsibilities beyond the price tag and down payment. Closing costs are various fees and expenses you'll need to pay on the closing date to finalize your purchase.
            </p>
            <p className="mt-3 font-body font-medium text-foreground">
              Budget approximately <span className="text-primary">3% to 4%</span> of the home's purchase price for closing costs, plus Ontario's 13% HST where applicable.
            </p>
          </div>
        </div>
      </div>

      {/* Conditional Home Inspections */}
      <div className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-semibold">Conditional Home Inspections</h2>
        <p className="mb-4 text-muted-foreground font-body font-light leading-relaxed">
          If the home was sold conditionally, the offer is only legally binding once all outlined conditions have been met during the conditional phase.
        </p>
        <div className="article-card rounded-sm p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-green-500" />
            <div>
              <p className="font-body font-medium">Home Inspection Cost</p>
              <p className="text-muted-foreground font-body font-light">
                The average price range for a property inspection in Ontario is <span className="font-semibold text-foreground">$300 to $750</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown of Closing Costs */}
      <div className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-semibold">Breakdown of Closing Costs</h2>
        <p className="mb-6 text-muted-foreground font-body font-light leading-relaxed">
          The closing costs you pay as a buyer can vary, but expect an average of <span className="font-semibold text-foreground">1.5% to 4%</span> of the purchase price.
        </p>

        <div className="space-y-6">
          {/* Legal Fees */}
          <div className="article-card rounded-sm p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold mb-4">Real Estate Lawyer Fees and Legal Fees</h3>
            <p className="mb-4 text-muted-foreground font-body font-light leading-relaxed">
              In Ontario, hiring a real estate lawyer is a requirement. A reputable lawyer will charge approximately <span className="font-semibold text-foreground">$1,200 to $2,400 plus 13% HST</span>.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Registration Fees", text: "To transfer the Title from the seller, you'll need to pay the Land Registrar of Ontario." },
                { title: "Title Insurance", text: "A one-time purchase typically ranging from $250 to $500." },
                { title: "Disbursements", text: "Fees your lawyer pays on your behalf, including access to Teranet's Land Registry." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-body font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground font-body font-light">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Land Transfer Tax */}
          <div className="article-card rounded-sm p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold mb-4">Land Transfer Tax (LTT)</h3>
            <p className="mb-4 text-muted-foreground font-body font-light leading-relaxed">
              The largest portion of your closing costs. This provincial tax varies based on the property value.
            </p>
            <div className="rounded-sm border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Purchase Price</TableHead>
                    <TableHead>Land Transfer Tax Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lttRates.map((rate, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-body">{rate.range}</TableCell>
                      <TableCell className="font-body font-semibold text-primary">{rate.rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <Link to="/buying-tips/land-transfer-tax" className="text-primary font-body text-sm hover:underline">
                Use our Land Transfer Tax Calculator →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* First-Time Home Buyer Sample */}
      <div className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-semibold">First-Time Home Buyer Closing Costs</h2>
        <p className="mb-6 text-muted-foreground font-body font-light leading-relaxed">
          Sample breakdown for purchasing an $800,000 home in Toronto with a standard 20% downpayment.
        </p>
        <div className="article-card rounded-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleClosingCosts.map((cost, index) => (
                <TableRow key={index}>
                  <TableCell className="font-body font-medium">{cost.item}</TableCell>
                  <TableCell className="text-primary font-body">{cost.amount}</TableCell>
                  <TableCell className="hidden text-muted-foreground font-body font-light md:table-cell">{cost.note}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell className="font-body">Total</TableCell>
                <TableCell className="text-primary font-body">$21,275</TableCell>
                <TableCell className="hidden md:table-cell font-body">Typical closing costs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Additional Closing Costs */}
      <div className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-semibold">Additional Closing Costs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Property Appraisal Fee", text: "Ensures the property value aligns with the loan amount.", price: "$300 - $700" },
            { title: "Property Survey", text: "Documents property boundaries and physical features.", price: "$1,500 - $6,000" },
          ].map((item) => (
            <div key={item.title} className="article-card rounded-sm p-6">
              <h3 className="mb-2 font-body font-semibold">{item.title}</h3>
              <p className="mb-2 text-sm text-muted-foreground font-body font-light">{item.text}</p>
              <p className="text-lg font-display font-bold text-primary">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Notes */}
      <div className="rounded-sm border border-primary/20 bg-primary/5 p-8 md:p-10 mb-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Final Notes</h2>
        <p className="text-muted-foreground font-body font-light leading-relaxed">
          By planning and budgeting your closing costs, you can ensure a smooth and successful closing process. Always consult with your real estate lawyer and agent to get precise estimates.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/mortgage-calculator"
          className="inline-flex items-center gap-2 bg-primary px-8 py-3 text-xs font-body font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Mortgage Calculator
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default ClosingCosts;
