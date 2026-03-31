import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Percent, Calendar, PiggyBank, TrendingUp } from "lucide-react";

type PaymentFrequency = "monthly" | "semi-monthly" | "bi-weekly" | "weekly" | "accelerated-bi-weekly" | "accelerated-weekly";

const FREQUENCY_LABELS: Record<PaymentFrequency, string> = {
  "monthly": "Monthly",
  "semi-monthly": "Semi-monthly",
  "bi-weekly": "Bi-weekly",
  "weekly": "Weekly",
  "accelerated-bi-weekly": "Accelerated bi-weekly",
  "accelerated-weekly": "Accelerated weekly",
};

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(800000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>("monthly");
  const [buyerType, setBuyerType] = useState("homebuyer");
  const [propertyType, setPropertyType] = useState("existing");

  const cmhcEligible30yr = buyerType === "first-time-homebuyer" || propertyType === "new-build";

  const downPayment = useMemo(() => Math.round(homePrice * downPaymentPct / 100), [homePrice, downPaymentPct]);

  const loanAmount = useMemo(() => {
    return homePrice - downPayment;
  }, [homePrice, downPayment]);

  // CMHC Insurance calculation (required if down payment < 20%)
  // 30-year amortization only eligible for first-time buyers or new builds
  const cmhcInsurance = useMemo(() => {
    if (downPaymentPct >= 20) return 0;
    if (amortization > 25 && !cmhcEligible30yr) return 0;

    let rate = 0;
    if (downPaymentPct >= 15) rate = 0.028;
    else if (downPaymentPct >= 10) rate = 0.031;
    else if (downPaymentPct >= 5) rate = 0.04;

    return loanAmount * rate;
  }, [downPaymentPct, loanAmount, amortization, cmhcEligible30yr]);

  const totalMortgage = useMemo(() => {
    return loanAmount + cmhcInsurance;
  }, [loanAmount, cmhcInsurance]);

  // Base monthly payment
  const baseMonthlyPayment = useMemo(() => {
    const principal = totalMortgage;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = amortization * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }, [totalMortgage, interestRate, amortization]);

  // Payment per period based on frequency
  const paymentPerPeriod = useMemo(() => {
    switch (paymentFrequency) {
      case "monthly":             return baseMonthlyPayment;
      case "semi-monthly":        return baseMonthlyPayment / 2;
      case "bi-weekly":           return (baseMonthlyPayment * 12) / 26;
      case "weekly":              return (baseMonthlyPayment * 12) / 52;
      case "accelerated-bi-weekly": return baseMonthlyPayment / 2;
      case "accelerated-weekly":  return baseMonthlyPayment / 4;
    }
  }, [baseMonthlyPayment, paymentFrequency]);

  // Annual payments count
  const paymentsPerYear = useMemo(() => {
    switch (paymentFrequency) {
      case "monthly":             return 12;
      case "semi-monthly":        return 24;
      case "bi-weekly":           return 26;
      case "weekly":              return 52;
      case "accelerated-bi-weekly": return 26;
      case "accelerated-weekly":  return 52;
    }
  }, [paymentFrequency]);

  const totalInterest = useMemo(() => {
    return (paymentPerPeriod * paymentsPerYear * amortization) - totalMortgage;
  }, [paymentPerPeriod, paymentsPerYear, amortization, totalMortgage]);

  const totalCost = useMemo(() => {
    return paymentPerPeriod * paymentsPerYear * amortization;
  }, [paymentPerPeriod, paymentsPerYear, amortization]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyWithCents = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12">
        <div className="container max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Mortgage Calculator
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Estimate your monthly mortgage payments
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Calculator Inputs */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="font-display">Calculate Your Payment</CardTitle>
                <CardDescription>Adjust the values to see your estimated monthly payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* I am a */}
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <Select value={buyerType} onValueChange={setBuyerType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-time-homebuyer">First-time Homebuyer</SelectItem>
                      <SelectItem value="homebuyer">Homebuyer</SelectItem>
                      <SelectItem value="mortgage-broker">Mortgage Broker</SelectItem>
                      <SelectItem value="real-estate-agent">Real Estate Agent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existing">Existing</SelectItem>
                      <SelectItem value="new-build">New Build</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Home Price */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="homePrice" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Home Price
                    </Label>
                    <span className="text-lg font-semibold">{formatCurrency(homePrice)}</span>
                  </div>
                  <Slider
                    id="homePrice"
                    value={[homePrice]}
                    onValueChange={(value) => setHomePrice(value[0])}
                    min={100000}
                    max={3000000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$100K</span>
                    <span>$3M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="downPayment" className="flex items-center gap-2">
                      <PiggyBank className="h-4 w-4 text-primary" />
                      Down Payment ({downPaymentPct}%)
                    </Label>
                    <span className="text-lg font-semibold">{formatCurrency(downPayment)}</span>
                  </div>
                  <Slider
                    id="downPayment"
                    value={[downPaymentPct]}
                    onValueChange={(value) => setDownPaymentPct(value[0])}
                    min={5}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5%</span>
                    <span>50%</span>
                  </div>
                  {Number(downPaymentPct) < 20 && (
                    <p className="text-xs text-amber-600">
                      ⚠️ Down payments under 20% require CMHC mortgage insurance
                    </p>
                  )}
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="interestRate" className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-primary" />
                      Interest Rate
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Math.min(15, Math.max(0.5, Number(e.target.value))))}
                        className="w-20 text-right"
                        step={0.1}
                        min={0.5}
                        max={15}
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <Slider
                    id="interestRate"
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={0.5}
                    max={15}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.5%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Amortization */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amortization" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Amortization Period
                    </Label>
                    <span className="text-lg font-semibold">{amortization} years</span>
                  </div>
                  <Slider
                    id="amortization"
                    value={[amortization]}
                    onValueChange={(value) => setAmortization(value[0])}
                    min={5}
                    max={30}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 years</span>
                    <span>30 years</span>
                  </div>
                  {amortization === 30 && !cmhcEligible30yr && Number(downPaymentPct) < 20 && (
                    <p className="text-xs text-red-600 font-medium">
                      CMHC insurance not available — a minimum 20% down payment is required for 30-year amortization unless you are a first-time homebuyer or purchasing a new build.
                    </p>
                  )}
                </div>

                {/* Payment Frequency */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Payment Frequency
                  </Label>
                  <Select value={paymentFrequency} onValueChange={(v) => setPaymentFrequency(v as PaymentFrequency)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.entries(FREQUENCY_LABELS) as [PaymentFrequency, string][]).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* Monthly Payment */}
              <Card className="card-shadow border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Estimated Payment</p>
                  <p className="mt-2 font-display text-4xl font-bold text-primary md:text-5xl">
                    {formatCurrencyWithCents(paymentPerPeriod)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{FREQUENCY_LABELS[paymentFrequency].toLowerCase()}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{amortization}-year amortization</p>
                </CardContent>
              </Card>

              {/* Breakdown */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Home Price</span>
                    <span className="font-medium">{formatCurrency(homePrice)}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="font-medium text-green-600">- {formatCurrency(downPayment)} ({downPaymentPct}%)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Mortgage Amount</span>
                    <span className="font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  {cmhcInsurance > 0 && (
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">CMHC Insurance</span>
                      <span className="font-medium text-amber-600">+ {formatCurrency(cmhcInsurance)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Total Mortgage</span>
                    <span className="font-semibold">{formatCurrency(totalMortgage)}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Total Interest ({amortization} years)</span>
                    <span className="font-medium text-red-600">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-semibold">Total Cost</span>
                    <span className="font-bold text-lg">{formatCurrency(totalCost)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <p className="text-center text-xs text-muted-foreground">
                * This calculator provides estimates only. Actual payments may vary based on 
                your specific situation, property taxes, and insurance. Contact Sanjeev for 
                a personalized mortgage consultation.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MortgageCalculator;
