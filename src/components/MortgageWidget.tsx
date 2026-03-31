import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

interface MortgageWidgetProps {
  listingPrice: number;
}

const MortgageWidget = ({ listingPrice }: MortgageWidgetProps) => {
  const [price, setPrice] = useState(listingPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [rate, setRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);

  const downPayment = Math.round(price * downPaymentPct / 100);
  const principal = price - downPayment;

  const monthly = useMemo(() => {
    if (principal <= 0 || rate <= 0) return 0;
    const r = rate / 100 / 12;
    const n = amortization * 12;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [principal, rate, amortization]);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-primary px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-primary-foreground flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Mortgage Calculator
        </h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm">Home Price</Label>
          <Input
            type="text"
            value={formatCurrency(price)}
            onChange={(e) => {
              const num = Number(e.target.value.replace(/[^0-9]/g, ""));
              if (!isNaN(num)) setPrice(num);
            }}
            className="bg-background"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <Label>Down Payment</Label>
            <span className="font-semibold text-foreground">{downPaymentPct}% ({formatCurrency(downPayment)})</span>
          </div>
          <Slider
            value={[downPaymentPct]}
            onValueChange={([v]) => setDownPaymentPct(v)}
            min={5}
            max={50}
            step={1}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <Label>Interest Rate</Label>
            <span className="font-semibold text-foreground">{rate}%</span>
          </div>
          <Slider
            value={[rate]}
            onValueChange={([v]) => setRate(Math.round(v * 10) / 10)}
            min={1}
            max={10}
            step={0.1}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <Label>Amortization</Label>
            <span className="font-semibold text-foreground">{amortization} years</span>
          </div>
          <Slider
            value={[amortization]}
            onValueChange={([v]) => setAmortization(v)}
            min={5}
            max={30}
            step={5}
          />
        </div>

        <div className="rounded-lg bg-primary/10 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Estimated Monthly Payment</p>
          <p className="font-display text-2xl font-bold text-primary">{formatCurrency(monthly)}</p>
          <p className="text-xs text-muted-foreground mt-1">Principal & Interest only</p>
        </div>
      </div>
    </div>
  );
};

export default MortgageWidget;
