import ArticleLayout from "@/components/ArticleLayout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Download, Home, Wrench, MapPin, Settings } from "lucide-react";

const DreamHomeChecklist = () => {
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html><html><head><title>Dream Home Checklist</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { text-align: center; color: #333; margin-bottom: 30px; }
        h2 { color: #555; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-top: 30px; }
        .checklist-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .checklist-item { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
        .checkbox { width: 14px; height: 14px; border: 1px solid #333; display: inline-block; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      <h1>Dream Home Checklist: Wants and Needs</h1>
      <h2>Exterior</h2><div class="checklist-grid">${exteriorItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Interior</h2><div class="checklist-grid">${interiorItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Features</h2><div class="checklist-grid">${featureItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Systems</h2><div class="checklist-grid">${systemItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Location</h2><div class="checklist-grid">${locationItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 250);
  };

  return (
    <ArticleLayout
      title="Dream Home Checklist"
      subtitle="Use this comprehensive checklist to identify your wants and needs when searching for your perfect home."
      backTo="/buying-tips"
      backLabel="Back to Buying Tips"
      maxWidth="max-w-5xl"
    >
      <div className="mb-8 flex justify-center">
        <Button onClick={handleDownloadPDF} className="gap-2 bg-primary px-8 py-3 text-xs font-body font-medium uppercase tracking-[0.2em]">
          <Download className="h-4 w-4" />
          Download as PDF
        </Button>
      </div>

      {/* Property Info */}
      <AnimatedSection>
        <div className="article-card rounded-sm p-8 mb-8">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Property Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {["Home Location", "Address", "Asking Price", "Annual Property Taxes", "Mortgage Terms"].map((label) => (
              <div key={label} className={`space-y-2 ${label === "Mortgage Terms" ? "md:col-span-2" : ""}`}>
                <label className="text-xs font-body font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</label>
                <div className="border-b border-border pb-2">_____________________________</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {[
        { title: "Exterior", icon: Home, items: exteriorItems },
        { title: "Interior", icon: Home, items: interiorItems },
        { title: "Features", icon: Wrench, items: featureItems },
        { title: "Systems", icon: Settings, items: systemItems },
        { title: "Location", icon: MapPin, items: locationItems },
      ].map((section, idx) => (
        <AnimatedSection key={section.title} delay={idx * 0.08}>
          <div className="article-card rounded-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                <section.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{section.title}</h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item, index) => (
                <label key={index} className="flex items-center gap-3 rounded-sm p-2 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="h-5 w-5 shrink-0 rounded-sm border-2 border-muted-foreground/30" />
                  <span className="text-sm font-body font-light">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </AnimatedSection>
      ))}

      {/* Notes */}
      <div className="article-card rounded-sm p-8 mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Notes</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-b border-border pb-4" />
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Button onClick={handleDownloadPDF} className="gap-2 bg-primary px-8 py-3 text-xs font-body font-medium uppercase tracking-[0.2em]">
          <Download className="h-4 w-4" />
          Download as PDF
        </Button>
        <p className="mt-4 text-sm text-muted-foreground font-body font-light">Print this checklist or save it as a PDF to bring with you when viewing homes.</p>
      </div>
    </ArticleLayout>
  );
};

const exteriorItems = ["Large lot and yard", "Single-family detached home", "Duplex/Triplex", "Semi-detached home", "Town home", "Condominium", "One storey home", "Two storey home", "Three storey home", "Fenced backyard", "Deck or patio area", "Mature trees, landscaping", "Low-maintenance landscaping", "Swimming pool", "Attached garage", "One-car garage", "Two-car garage", "Private driveway", "Enclosed front porch", "Eaves troughs and downspouts", "Brick", "Wood", "Aluminum siding", "Recently painted woodwork"];
const interiorItems = ["1 bedroom", "2 bedroom", "3 bedroom", "4 bedroom", "1 bathroom", "2 bathroom", "3 bathroom", "4 bathroom", "Kitchen pantry/adequate cupboard space", "Garage has indoor access", "Utility room (for washer/dryer)", "Ensuite bathroom off master bedroom", "Main-floor bathroom", "Room for den or home office", "Wall-to-wall carpeting", "Hardwood floors", "Closet in foyer", "Plenty of closets/storage", "Separate dining room", "Large windows", "Fireplace in living room", "Thermopane windows", "Separate family room", "Fireplace in family or recreation room", "Draperies or blinds"];
const featureItems = ["Eat-in kitchen", "Island kitchen", "Kitchen appliances with purchase", "Basement for storage/workshop", "Finished basement for additional living area", "Apartment in basement for rental income"];
const systemItems = ["Efficient heating system", "Oil heating system", "Gas heating system", "Electric heating system", "Heat pump heating system", "Wood heating system", "Window air conditioning", "Central air conditioning", "Modern plumbing (copper) and fixtures", "City water", "Well water", "High-amp electrical system (at least 100 amps)", "Circuit breakers", "Gas hot water heater", "Electric hot water heater", "Cable TV or antenna", "Sewer", "Septic tank"];
const locationItems = ["Nearby facilities", "Quiet street", "Shopping within walking distance or short drive", "Parks/playgrounds", "Golf course", "Skating rinks", "Restaurants/theaters", "Community centre", "Public swimming pool/tennis courts", "Public library", "Places of worship", "Police", "Fire department", "Hospital", "Medical (doctors, dentists, etc.)", "Day care", "Snow removal", "Public transportation", "Close to work", "Near major highway", "Schools", "School-operated transportation"];

export default DreamHomeChecklist;
