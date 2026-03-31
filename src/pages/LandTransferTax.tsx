import ArticleLayout from "@/components/ArticleLayout";
import { Calculator, HelpCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TaxBracket = { min: number; max: number | null; rate: number };

const ontarioProvincialBrackets: TaxBracket[] = [
  { min: 0, max: 55000, rate: 0.005 },
  { min: 55000, max: 250000, rate: 0.01 },
  { min: 250000, max: 400000, rate: 0.015 },
  { min: 400000, max: 2000000, rate: 0.02 },
  { min: 2000000, max: null, rate: 0.025 },
];

const torontoMunicipalBrackets: TaxBracket[] = [
  { min: 0, max: 55000, rate: 0.005 },
  { min: 55000, max: 250000, rate: 0.01 },
  { min: 250000, max: 400000, rate: 0.015 },
  { min: 400000, max: 2000000, rate: 0.02 },
  { min: 2000000, max: 3000000, rate: 0.025 },
  { min: 3000000, max: 4000000, rate: 0.035 },
  { min: 4000000, max: 5000000, rate: 0.045 },
  { min: 5000000, max: 10000000, rate: 0.055 },
  { min: 10000000, max: 20000000, rate: 0.065 },
  { min: 20000000, max: null, rate: 0.075 },
];

const bcBrackets: TaxBracket[] = [
  { min: 0, max: 200000, rate: 0.01 },
  { min: 200000, max: 2000000, rate: 0.02 },
  { min: 2000000, max: 3000000, rate: 0.03 },
  { min: 3000000, max: null, rate: 0.05 },
];

const manitobaBrackets: TaxBracket[] = [
  { min: 0, max: 30000, rate: 0 },
  { min: 30000, max: 90000, rate: 0.005 },
  { min: 90000, max: 150000, rate: 0.01 },
  { min: 150000, max: 200000, rate: 0.015 },
  { min: 200000, max: null, rate: 0.02 },
];

const quebecBrackets: TaxBracket[] = [
  { min: 0, max: 51700, rate: 0.005 },
  { min: 51700, max: 258600, rate: 0.01 },
  { min: 258600, max: null, rate: 0.015 },
];

const montrealBrackets: TaxBracket[] = [
  { min: 0, max: 51700, rate: 0.005 },
  { min: 51700, max: 258600, rate: 0.01 },
  { min: 258600, max: 517100, rate: 0.015 },
  { min: 517100, max: 1034200, rate: 0.02 },
  { min: 1034200, max: 2000000, rate: 0.025 },
  { min: 2000000, max: null, rate: 0.03 },
];

const calculateTax = (price: number, brackets: TaxBracket[]): number => {
  if (price <= 0) return 0;
  let tax = 0;
  for (const b of brackets) {
    if (price <= b.min) break;
    const taxable = (b.max ? Math.min(price, b.max) : price) - b.min;
    tax += taxable * b.rate;
  }
  return tax;
};

const locations = [
  { value: "ontario", label: "Ontario (excluding Toronto)" },
  { value: "toronto", label: "Toronto, ON" },
  { value: "bc", label: "British Columbia" },
  { value: "manitoba", label: "Manitoba" },
  { value: "quebec", label: "Quebec (excluding Montreal)" },
  { value: "montreal", label: "Montreal, QC" },
  { value: "new-brunswick", label: "New Brunswick" },
  { value: "pei", label: "Prince Edward Island" },
  { value: "nova-scotia", label: "Nova Scotia (Halifax)" },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const LandTransferTax = () => {
  const [purchasePrice, setPurchasePrice] = useState<string>("500000");
  const [location, setLocation] = useState<string>("ontario");
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    let provincialTax = 0;
    let municipalTax = 0;
    let provincialRebate = 0;
    let municipalRebate = 0;

    switch (location) {
      case "ontario":
      case "toronto":
        provincialTax = calculateTax(price, ontarioProvincialBrackets);
        if (isFirstTimeBuyer) provincialRebate = Math.min(provincialTax, 4000);
        if (location === "toronto") {
          municipalTax = calculateTax(price, torontoMunicipalBrackets);
          if (isFirstTimeBuyer) municipalRebate = Math.min(municipalTax, 4475);
        }
        break;
      case "bc":
        provincialTax = calculateTax(price, bcBrackets);
        if (isFirstTimeBuyer) {
          if (price <= 500000) provincialRebate = provincialTax;
          else if (price <= 525000) provincialRebate = provincialTax * ((525000 - price) / 25000);
        }
        break;
      case "manitoba":
        provincialTax = calculateTax(price, manitobaBrackets);
        break;
      case "quebec":
        provincialTax = calculateTax(price, quebecBrackets);
        break;
      case "montreal":
        provincialTax = calculateTax(price, montrealBrackets);
        break;
      case "new-brunswick":
        provincialTax = price * 0.01;
        break;
      case "pei":
        provincialTax = price >= 30000 ? price * 0.01 : 0;
        if (isFirstTimeBuyer && price < 200000) provincialRebate = provincialTax;
        break;
      case "nova-scotia":
        provincialTax = price * 0.015;
        break;
    }

    const totalRebate = provincialRebate + municipalRebate;
    const totalTax = Math.max(0, provincialTax + municipalTax - totalRebate);
    return { provincialTax, municipalTax, totalRebate, totalTax };
  }, [purchasePrice, location, isFirstTimeBuyer]);

  const hasMunicipal = location === "toronto";
  const hasRebate = ["ontario", "toronto", "bc", "pei"].includes(location);

  return (
    <ArticleLayout
      title="Land Transfer Tax Calculator"
      subtitle="When you buy a house, condo or land anywhere in Canada outside Alberta and Saskatchewan, you are subject to land transfer tax. Use our calculator to determine your land transfer tax amount."
      backTo="/buying-tips"
      backLabel="Back to Buying Tips"
      
      maxWidth="max-w-4xl"
    >
      {/* Provincial Rate Tables */}
      <div className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">Guide to Land Transfer Tax by Province</h2>
        <p className="mb-8 text-muted-foreground font-body font-light leading-relaxed">Land transfer taxes are calculated based on the purchase price of your property. Each province sets its own rates.</p>

        {[
          { title: "Ontario", subtitle: "Land Transfer Tax", rows: [["First $55,000", "0.5%"], ["$55,000.01 to $250,000", "1.0%"], ["$250,000.01 to $400,000", "1.5%"], ["$400,000.01 to $2,000,000", "2.0%"], ["Over $2,000,000", "2.5%"]], rebate: "First-time homebuyers can receive a refund up to $4,000." },
          { title: "Toronto", subtitle: "Municipal Land Transfer Tax", rows: [["First $55,000", "0.5%"], ["$55,000.01 to $250,000", "1.0%"], ["$250,000.01 to $400,000", "1.5%"], ["$400,000.01 to $2,000,000", "2.0%"], ["Over $2,000,000", "2.5%"], ["Over $3,000,000", "3.5%"], ["Over $4,000,000", "4.5%"], ["Over $5,000,000", "5.5%"], ["Over $10,000,000", "6.5%"], ["Over $20,000,000", "7.5%"]], rebate: "First-time homebuyers can receive a rebate up to $4,475." },
          { title: "British Columbia", subtitle: "Property Purchase Tax", rows: [["First $200,000", "1.0%"], ["$200,001 to $2,000,000", "2.0%"], ["Over $2,000,000", "3.0%"], ["Over $3,000,000", "5.0% (residential)"]], rebate: "First-time homebuyers are eligible for a full exemption on homes up to $500,000." },
          { title: "Manitoba", subtitle: "Land Transfer Tax", rows: [["First $30,000", "No tax"], ["$30,001 to $90,000", "0.5%"], ["$90,001 to $150,000", "1.0%"], ["$150,001 to $200,000", "1.5%"], ["Over $200,000", "2.0%"]] },
        ].map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="font-display text-lg font-semibold text-primary mb-1 flex items-center gap-2">
              {section.title}
              <span className="text-sm font-body font-normal text-muted-foreground">— {section.subtitle}</span>
            </h3>
            <div className="rounded-sm border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-body font-semibold">Purchase Price Range</TableHead>
                    <TableHead className="font-body font-semibold text-right">Marginal Tax Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.rows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-body">{row[0]}</TableCell>
                      <TableCell className="text-right font-body font-medium">{row[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {section.rebate && (
              <div className="mt-3 rounded-sm bg-muted/50 border border-border p-4">
                <p className="text-sm text-foreground font-body font-light">
                  <strong>First-time buyer rebate:</strong> {section.rebate}
                </p>
              </div>
            )}
          </div>
        ))}

        <div className="mt-8 rounded-sm border border-primary/20 bg-primary/5 p-6">
          <h3 className="mb-2 font-display text-lg font-semibold text-foreground">Alberta & Saskatchewan</h3>
          <p className="text-muted-foreground font-body font-light leading-relaxed">
            Alberta and Saskatchewan do not charge land transfer taxes. Alberta charges a Transfer of Land registration fee ($50 base + $2 per $5,000 of value) and Saskatchewan charges a title transfer fee of 0.3% of property value.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-10">
        <h3 className="font-display text-xl font-semibold text-foreground text-center mb-6 flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Land Transfer Tax Calculator
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-body font-medium">Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="price" type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="pl-7" placeholder="Enter amount" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-body font-medium">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location"><SelectValue placeholder="Select location" /></SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end pb-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="firstTime" checked={isFirstTimeBuyer} onCheckedChange={(checked) => setIsFirstTimeBuyer(checked === true)} />
              <Label htmlFor="firstTime" className="text-sm font-body font-medium cursor-pointer">I'm a first-time home buyer</Label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 rounded-sm border bg-muted/30 p-6">
          <h3 className="mb-4 text-center font-display text-base font-semibold text-primary">Determining your land transfer tax</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-sm bg-background p-4">
              <div className="flex items-center gap-2"><span className="text-muted-foreground font-body">Provincial</span><HelpCircle className="h-4 w-4 text-muted-foreground/50" /></div>
              <span className="text-lg font-display font-bold text-foreground">{formatCurrency(calculations.provincialTax)}</span>
            </div>
            {hasMunicipal && (
              <div className="flex items-center justify-between rounded-sm bg-background p-4">
                <div className="flex items-center gap-2"><span className="text-lg text-muted-foreground">+</span><span className="text-muted-foreground font-body">Municipal</span></div>
                <span className="text-lg font-display font-bold text-foreground">{formatCurrency(calculations.municipalTax)}</span>
              </div>
            )}
            {hasRebate && calculations.totalRebate > 0 && (
              <div className="flex items-center justify-between rounded-sm bg-background p-4">
                <div className="flex items-center gap-2"><span className="text-lg text-muted-foreground">−</span><span className="text-muted-foreground font-body">Rebate</span></div>
                <span className="text-lg font-display font-bold text-primary">-{formatCurrency(calculations.totalRebate)}</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between rounded-sm border-2 border-primary bg-primary/5 p-4">
              <div className="flex items-center gap-2"><span className="text-lg text-muted-foreground">=</span><span className="font-body font-semibold text-foreground">Land transfer tax</span></div>
              <span className="text-2xl font-display font-bold text-primary">{formatCurrency(calculations.totalTax)}</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center font-body">* This calculator provides estimates only. Consult with your lawyer for exact amounts.</p>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { value: "who-pays", q: "Who pays land transfer tax?", a: "In most provinces in Canada, the buyer is responsible for paying land transfer tax to the provincial government upon closing a property purchase. The only provinces with no land transfer tax are Alberta and Saskatchewan." },
            { value: "what-is", q: "What is land transfer tax?", a: "Land transfer tax (LTT) is a provincial tax levied on newly acquired land. When you purchase a property, you'll be required to pay a percentage of the property value as a lump sum once the transaction has closed." },
            { value: "avoid", q: "How do I avoid paying land transfer tax?", a: "If you acquire property in Alberta or Saskatchewan, you can avoid paying land transfer tax. Elsewhere, you may avoid it in some cases like transfers between family members." },
            { value: "rebate", q: "Is there a land transfer tax rebate?", a: "Yes, many provinces offer rebates for first-time homebuyers. Ontario offers up to $4,000 on provincial LTT, BC offers full/partial exemption up to $500,000, and Toronto offers up to $4,475 on municipal LTT." },
          ].map((faq) => (
            <AccordionItem key={faq.value} value={faq.value} className="article-card rounded-sm px-6">
              <AccordionTrigger className="text-left font-body font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body font-light leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ArticleLayout>
  );
};

export default LandTransferTax;
