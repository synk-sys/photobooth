import ArticleLayout from "@/components/ArticleLayout";
import { Button } from "@/components/ui/button";
import { Download, Home, Building, MapPin, Users } from "lucide-react";

const HouseHuntingChecklist = () => {
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html><html><head><title>House Hunting Checklist</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; font-size: 12px; }
        h1 { text-align: center; color: #333; margin-bottom: 20px; font-size: 24px; }
        h2 { color: #555; border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-top: 25px; font-size: 16px; }
        .checklist-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; }
        .checklist-item { display: flex; align-items: center; gap: 6px; padding: 2px 0; }
        .checkbox { width: 12px; height: 12px; border: 1px solid #333; display: inline-block; }
        @media print { body { padding: 15px; } }
      </style></head><body>
      <h1>House Hunting Checklist</h1>
      <h2>The Home's Exterior - Lot Details</h2>
      <div class="checklist-grid">${lotDetails.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Structure Details</h2>
      <div class="checklist-grid">${structureDetails.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>The Home's Interior</h2>
      <div class="checklist-grid">${interiorItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Systems</h2>
      <div class="checklist-grid">${systemItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Community</h2>
      <div class="checklist-grid">${communityItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      <h2>Local Neighbourhood</h2>
      <div class="checklist-grid">${neighbourhoodItems.map(item => `<div class="checklist-item"><span class="checkbox"></span> ${item}</div>`).join('')}</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 250);
  };

  return (
    <ArticleLayout
      title="House Hunting Checklist"
      subtitle="Use this comprehensive checklist when viewing properties to evaluate their suitability and condition."
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
      <div className="article-card rounded-sm p-8 mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Property Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {["Home Location", "Address", "Asking Price", "Annual Property Taxes", "Mortgage Terms", "Zoning Restrictions"].map((label) => (
            <div key={label} className="space-y-2">
              <label className="text-xs font-body font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</label>
              <div className="border-b border-border pb-2">_____________________________</div>
            </div>
          ))}
        </div>
      </div>

      <ChecklistSection title="The Home's Exterior" icon={Home} subsections={[{ title: "Lot Details", items: lotDetails }, { title: "Structure Details", items: structureDetails }]} />
      <ChecklistSection title="The Home's Interior" icon={Building} subsections={[{ title: "Doors, Windows & Kitchen", items: interiorItems.slice(0, 14) }, { title: "Rooms & Other Details", items: interiorItems.slice(14) }]} />

      {[
        { title: "Systems", icon: Building, items: systemItems },
        { title: "Community (Close to)", icon: MapPin, items: communityItems },
        { title: "Local Neighbourhood", icon: Users, items: neighbourhoodItems },
      ].map((section) => (
        <div key={section.title} className="article-card rounded-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <section.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{section.title}</h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, index) => (
              <ChecklistItem key={index} label={item} />
            ))}
          </div>
        </div>
      ))}

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

interface ChecklistSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  subsections: { title: string; items: string[] }[];
}

const ChecklistSection = ({ title, icon: Icon, subsections }: ChecklistSectionProps) => (
  <div className="article-card rounded-sm p-8 mb-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
    </div>
    <div className="space-y-6">
      {subsections.map((subsection, idx) => (
        <div key={idx}>
          <h4 className="font-body font-semibold text-muted-foreground mb-3 text-sm uppercase tracking-[0.1em]">{subsection.title}</h4>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {subsection.items.map((item, index) => (
              <ChecklistItem key={index} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChecklistItem = ({ label }: { label: string }) => (
  <label className="flex items-center gap-3 rounded-sm p-2 hover:bg-muted/50 cursor-pointer transition-colors">
    <div className="h-5 w-5 shrink-0 rounded-sm border-2 border-muted-foreground/30" />
    <span className="text-sm font-body font-light">{label}</span>
  </label>
);

const lotDetails = ["Lot size/shape", "Landscaping condition: good/moderate/poor", "Position of home on lot", "Driveway: private/shared", "General lot condition", "Front yard: sm/med/lg", "Side yard: sm/med/lg", "Rear yard: sm/med/lg", "Mature trees, shrubs", "Curb appeal: good/moderate/poor", "Condition of walkways"];
const structureDetails = ["Number of stories: 1/2/3/4", "Type of home", "Siding: brick/wood/aluminum", "Condition of siding & paint", "Garage: attached/detached", "Parking spaces", "Front porch: covered/enclosed", "Fenced front yard", "Fenced backyard", "Eaves troughs and downspouts", "Patio/deck condition", "Swimming pool", "Storage shed", "Type of roof", "Roof condition", "Recent roof repairs", "Roof age", "Foundation condition"];
const interiorItems = ["Windows: single pane/thermopane", "General window condition", "Door locks/latches work", "Kitchen size/colours", "Eat-in area", "Cooking island", "Sufficient cupboard space", "Sufficient counter space", "Countertop type/condition", "Floor type/condition", "Pantry", "Sink: single/double", "Appliances included", "Appliance condition", "Fireplace", "Living room floor condition", "Separate dining room", "Square footage", "Foyer closet", "Soundproof/fireproof walls", "Number of bathrooms", "Ensuite bathroom", "Number of bedrooms", "Bedroom closets", "Basement headroom", "Basement finished", "Basement door to outside", "Utility/laundry area", "Storage areas", "Cracks in walls/floor", "Evidence of flood/moisture"];
const systemItems = ["Electrical condition", "Sufficient outlets", "Amperage", "Fuses/circuit breakers", "Wiring: aluminum/copper", "Meets current codes", "Copper pipes", "Signs of leaks", "Plumbing age", "Water source: city/well", "Water quality tested", "Sewage/septic type", "Heating type", "Heating age", "Air conditioning type", "A/C age", "Hot water heater: leased/owned", "Hot water type: gas/electric", "Insulation type/rating", "Asbestos or UFFI"];
const communityItems = ["Schools", "City services (fire/police/hospital)", "Medical (doctor, dentist)", "Shopping (grocery, pharmacy)", "Parks", "Playgrounds", "Day care", "Recreation/community centre", "Public swimming pool", "Public tennis courts", "Golf course", "Skating/hockey arena", "Restaurants", "Gas station", "Theatres", "Public library", "Major roads/highways", "Places of worship", "Train tracks/congestion issues"];
const neighbourhoodItems = ["Urban/suburban/rural", "Older/newer neighbourhood", "Type of homes", "Age group of homeowners", "Quiet streets", "Adequate street lights", "Power/telephone lines visible", "Well-cared for homes/yards", "Sidewalks", "Space between homes", "Adequate street parking", "Overnight parking restrictions", "Road condition"];

export default HouseHuntingChecklist;
