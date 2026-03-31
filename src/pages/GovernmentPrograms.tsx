import ArticleLayout from "@/components/ArticleLayout";
import { Building, DollarSign, Home, Percent, Receipt, PiggyBank } from "lucide-react";

const programs = [
  { id: "cmhc", title: "CMHC Purchase Plus" },
  { id: "rrsp", title: "RRSP Home Buyers' Plan" },
  { id: "downpayment", title: "5% Down Payment" },
  { id: "hst", title: "HST Rebate" },
  { id: "ltt", title: "LTT Rebate" },
  { id: "fthbtc", title: "First-Time Buyer Tax Credit" },
];

const GovernmentPrograms = () => {
  return (
    <ArticleLayout
      title="Government Programs for Home Buyers"
      subtitle="A home is usually the single largest investment that most people make in their lives. Achieving your dream can be made easier by taking advantage of various Government Programs for home buyers and property owners."
      backTo="/buying-tips"
      backLabel="Back to Buying Tips"
      maxWidth="max-w-4xl"
    >
      {/* Programs Navigation */}
      <div className="mb-10 flex flex-wrap gap-2 justify-center">
        {programs.map((program) => (
          <a
            key={program.id}
            href={`#${program.id}`}
            className="px-4 py-2 rounded-sm border border-border/50 text-xs font-body font-medium uppercase tracking-[0.15em] text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {program.title}
          </a>
        ))}
      </div>

      <div className="space-y-10">
        {/* CMHC */}
        <div id="cmhc" className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Home className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">CMHC Purchase Plus Improvements</h2>
          </div>
          <div className="prose prose-gray max-w-none text-muted-foreground font-body font-light leading-relaxed">
            <p>CMHC insured mortgage loans are available to cover the purchase price of a home as well as an amount to pay for immediate major renovations or other improvements.</p>
            <p>This option eliminates the need to obtain secondary financing after the purchase to pay for improvements.</p>
            <h4 className="font-display text-base font-semibold text-foreground mt-6">Down Payment Requirements</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>If the home costs $500,000 or less, you'll need a minimum downpayment of 5%.</li>
              <li>If the home costs more than $500,000, you'll need 5% on the first $500,000 and 10% on the remainder.</li>
              <li>If the home costs $1,000,000 or more, mortgage loan insurance is not available.</li>
            </ul>
            <p className="mt-4">For more information call CMHC at (416) 221-2642 or visit <a href="http://www.cmhc.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cmhc.ca</a></p>
          </div>
        </div>

        {/* RRSP */}
        <div id="rrsp" className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <PiggyBank className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">RRSP Home Buyers' Plan</h2>
          </div>
          <div className="prose prose-gray max-w-none text-muted-foreground font-body font-light leading-relaxed">
            <p>The Home Buyers' Plan (HBP) allows you to withdraw up to $60,000 in a calendar year from your RRSPs to buy or build a qualifying home. Couples can withdraw up to $60,000 each for a total of $120,000.</p>
            <h4 className="font-display text-base font-semibold text-foreground mt-6">Eligibility Conditions</h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>You must be considered a first time home buyer</li>
              <li>You must have a written agreement to buy or build a qualifying home</li>
              <li>You must intend to occupy the qualifying home as your principal place of residence within one year</li>
            </ol>
            <h4 className="font-display text-base font-semibold text-foreground mt-6">Repayment</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your repayment period starts the second year after withdrawal</li>
              <li>You have 15 years to repay the amounts you withdraw</li>
              <li>You can repay the full amount at any time</li>
            </ul>
          </div>
        </div>

        {/* 5% Down Payment */}
        <div id="downpayment" className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Percent className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">5% Down Payment Program</h2>
          </div>
          <div className="prose prose-gray max-w-none text-muted-foreground font-body font-light leading-relaxed">
            <p>With as little as a 5% down payment, all home buyers have access to mortgage insurance enabling them to enter the housing market.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mortgage insurance for 95% mortgages is available to both first time and repeat home buyers.</li>
              <li>The maximum amortization period is 25 years.</li>
              <li>Insurance premiums where the 5% down payment comes from personal sources will be 2.75% of the mortgage loan.</li>
              <li>Borrowers must demonstrate ability to cover closing costs equal to at least 1.5% of the purchase price.</li>
            </ul>
            <p className="mt-4">For more information call CMHC at 1-800-668-2642 or visit <a href="http://www.cmhc.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cmhc.ca</a></p>
          </div>
        </div>

        {/* HST */}
        <div id="hst" className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Receipt className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">HST New Housing Rebate</h2>
          </div>
          <div className="prose prose-gray max-w-none text-muted-foreground font-body font-light leading-relaxed">
            <p>You may be eligible for a new housing rebate for some of the GST/HST paid if you are an individual who built, renovated, or purchased a new or substantially renovated house.</p>
            <h4 className="font-display text-base font-semibold text-foreground mt-6">Rebate Details</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>An eligible buyer can claim a rebate for 36% of the federal portion (5%) of the HST paid on a new home up to $350,000 with a maximum of $6,300.</li>
              <li>Where the pre-tax price is more than $350,000 but less than $450,000, the rebate will be reduced proportionately.</li>
              <li>An eligible buyer can also claim a rebate of 75% of the Ontario portion (8%) of the HST, capped at $24,000.</li>
            </ul>
            <p className="mt-4">For more information, see <a href="https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/rc4028.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Guide RC4028, GST/HST New Housing Rebate</a></p>
          </div>
        </div>

        {/* LTT Rebate */}
        <div id="ltt" className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Building className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">Land Transfer Tax (LTT) Rebate Program</h2>
          </div>
          <div className="prose prose-gray max-w-none text-muted-foreground font-body font-light leading-relaxed">
            <p>First-time homebuyers of an eligible home may be eligible for a refund of all or part of the land transfer tax.</p>
            <h4 className="font-display text-base font-semibold text-foreground mt-6">Rebate Amounts</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>The maximum amount of the refund is $4,000.</li>
              <li>No land transfer tax would be payable on the first $368,000 of value for qualifying first-time purchasers.</li>
            </ul>
            <h4 className="font-display text-base font-semibold text-foreground mt-6">Requirements to Qualify</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>The purchaser must be at least 18 years old.</li>
              <li>Must occupy the home as principal residence within nine months.</li>
              <li>Cannot have ever owned an eligible home anywhere in the world.</li>
            </ul>
            <p className="mt-4"><strong>Time Limit:</strong> A qualifying purchaser must apply within 18 months after registration.</p>
          </div>
        </div>

        {/* First-Time Home Buyer Tax Credit */}
        <div id="fthbtc" className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">First-Time Home Buyer Tax Credit</h2>
          </div>
          <div className="prose prose-gray max-w-none text-muted-foreground font-body font-light leading-relaxed">
            <p>The First-Time Home Buyer Tax Credit offers a $5,000 non-refundable income tax credit on a qualifying home. For an eligible individual, the credit will provide up to $750 in federal tax relief.</p>
            <h4 className="font-display text-base font-semibold text-foreground mt-6">Eligibility</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>You or your spouse or common-law partner acquired a qualifying home</li>
              <li>You did not live in another home owned by you or your spouse in the year of acquisition or in any of the four preceding years</li>
            </ul>
            <p className="mt-4">For more information, see <a href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-369-home-buyers-amount.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Home buyers' amount on Canada.ca</a></p>
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default GovernmentPrograms;
