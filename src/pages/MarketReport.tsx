import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/market-report-hero.jpg";
import { TrendingDown, TrendingUp, Minus, Home, Warehouse, Building } from "lucide-react";

type StatCardProps = {
  label: string;
  icon: React.ReactNode;
  change: number;
  prevLabel: string;
  prevValue: string;
  currLabel: string;
  currValue: string;
};

const StatCard = ({ label, icon, change, prevLabel, prevValue, currLabel, currValue }: StatCardProps) => {
  const isNegative = change < 0;
  const isZero = change === 0;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{label}</h3>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {isZero ? (
          <Minus className="h-5 w-5 text-muted-foreground" />
        ) : isNegative ? (
          <TrendingDown className="h-5 w-5 text-destructive" />
        ) : (
          <TrendingUp className="h-5 w-5 text-green-600" />
        )}
        <span
          className={`text-2xl font-bold ${
            isZero
              ? "text-muted-foreground"
              : isNegative
              ? "text-destructive"
              : "text-green-600"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">{prevLabel}</span>
          <span className="font-medium text-foreground">{prevValue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{currLabel}</span>
          <span className="font-medium text-foreground">{currValue}</span>
        </div>
      </div>
    </div>
  );
};

const priceData = [
  { label: "Detached Homes", icon: <Home className="h-5 w-5" />, change: 0.30, prevLabel: "JAN 26", prevValue: "$826,600", currLabel: "FEB 26", currValue: "$829,100" },
  { label: "Townhouses", icon: <Warehouse className="h-5 w-5" />, change: 0.69, prevLabel: "JAN 26", prevValue: "$590,200", currLabel: "FEB 26", currValue: "$594,300" },
  { label: "Condo Apartments", icon: <Building className="h-5 w-5" />, change: 0.10, prevLabel: "JAN 26", prevValue: "$495,700", currLabel: "FEB 26", currValue: "$496,200" },
];

const MarketReport = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <div className="container py-12 lg:py-20">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Modern Ontario home interior"
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>

            {/* Overlay Card */}
            <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 bg-card rounded-2xl shadow-xl p-8 lg:p-10 lg:max-w-md border border-border">
              <p className="text-primary font-semibold text-lg mb-1">Ontario</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Market Report
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-xl font-bold text-green-600">Overall: +3.15%</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground font-medium">JAN 26 Avg</span>
                  <span className="font-semibold text-foreground">$778,102</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">FEB 26 Avg</span>
                  <span className="font-semibold text-foreground">$802,601</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Report */}
      <section className="container py-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-10">
          February Ontario Market Report
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {priceData.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* Sold Report — totals only */}
      <section className="container py-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-10">
          February Sold Report
        </h2>
        <div className="max-w-sm mx-auto rounded-xl border border-border bg-card p-6 shadow-sm text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Units Sold — Ontario</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">+21.8%</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">JAN 26</span>
              <span className="font-medium">7,737 units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">FEB 26</span>
              <span className="font-medium">9,425 units</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container pb-12">
        <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
          Data sourced from the Ontario Real Estate Association (OREA) and the Canadian Real Estate Association (CREA).
          Figures represent average residential prices and sales volumes across Ontario. Updated monthly.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default MarketReport;
