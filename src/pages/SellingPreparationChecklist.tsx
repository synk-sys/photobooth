import ArticleLayout from "@/components/ArticleLayout";
import { Download } from "lucide-react";

const insideChecklist = [
  {
    category: "Floor Coverings",
    items: ["Dirt or stains?", "Excessive wear or damage?", "Area rugs clean and stain-free?"]
  },
  {
    category: "Walls and Ceilings",
    items: ["Dirt, fingerprints or other stains?", "Nail cracks or tape residue?", "Cracks, chips, water damage?", "Need for repainting or new wallpaper?", "Neutral, light colours for roomy environment?"]
  },
  {
    category: "Doors",
    items: ["Dirt, fingerprints or other stains?", "Need new paint?", "Open/close easily without squeaks?", "Latches/handles secure and working properly?"]
  },
  {
    category: "Windows",
    items: ["Glass sparkling clean; chip, paint and crack free?", "Open/close easily?", "Latches/handles/locks secure, working properly?", "Dirt and fingerprints on frames or sills?", "Screens clean and without holes?", "Storm windows in good condition?"]
  },
  {
    category: "Window Coverings",
    items: ["Dirt or stains?", "Excessive wear or sun damage?", "Open/close easily; hardware working properly?"]
  },
  {
    category: "Lighting",
    items: ["All bulbs working and proper wattage?", "Broken switches, exposed wiring?", "Table and floor lamps working properly?"]
  },
  {
    category: "Pet Areas",
    items: ["Clean, organized, odour-free?"]
  },
  {
    category: "Entryways and Hallways",
    items: ["Clean and free of clutter or obstructions?", "Welcome mat(s) clean and inviting?"]
  },
  {
    category: "Closets and Storage Areas",
    items: ["Clean and well organized?", "Clutter and excess junk removed?", "Clothes hung neatly and not jammed together?", "Shoes and boots neatly stored/stacked?"]
  },
  {
    category: "Kitchen",
    items: ["Every surface sparkling clean?", "Counter-tops organized, all but daily use appliances?", "Refrigerator spotless inside and out?", "Organized? Spoiled food discarded?", "Frost removed? Light bulbs working?", "Oven/stove-top clean? Burner trays cleaned?", "Sinks clean; faucets working properly and leak-free?", "Garbage disposal in good working condition?", "Cupboards/pantry spotless, organized?", "Dishwasher clean and stain-free?"]
  },
  {
    category: "Living Areas (Living Room/Dining Room/Bedrooms/Den)",
    items: ["Everything thoroughly vacuumed/dusted?", "Excess furniture removed for roomier atmosphere?", "Remaining furniture clean and in good repair?", "Wood and other surfaces clean and polished?", "Bookshelves neat, organized and clutter-free?", "Children's games/toys stored neatly?", "Fragile items removed and stored?", "Smaller valuables removed/locked away?", "Window coverings open for views and sunlight?", "Mirrors clean and in good repair?", "Ashtrays cleaned and kept out of sight?", "Fireplace clean, logs/kindling stacked neatly?"]
  },
  {
    category: "Bathrooms/Powder Room",
    items: ["Every surface sparkling clean?", "Counter-tops organized, free of clutter? Fresh soap?", "Sinks spotlessly clean; faucets working properly?", "Tub and shower surfaces clean?", "Towels stain-free and hanging neatly?", "Shower curtain clean and in good repair?", "Toilet extra-clean and working properly?", "Closets organized and clutter-free?", "Medicine cabinet clean, 'personal items' removed?"]
  },
  {
    category: "Basement/Furnace Room/Garage/Attic/Storeroom",
    items: ["Clean and well organized?", "Clutter and excess 'junk' removed?", "Remaining items stored/stacked neatly?", "Everything thoroughly vacuumed/dusted?"]
  }
];

const outsideChecklist = [
  {
    category: "Structures",
    items: ["Exterior surfaces clean, in good condition?", "Front door exterior clean, inviting?", "Eaves troughs and downspouts clean, in good repair?", "Gates open/close properly; hardware working?", "Fences/decks in good repair, in good condition?", "Sidewalks and walkways in good repair?", "Driveway clean, in good repair?"]
  },
  {
    category: "Yard and Environment",
    items: ["Driveways, sidewalks clear of snow, ice?", "Lawns mowed/edged regularly; large bare spots repaired?", "Leaves removed from lawns and flower beds?", "Trees pruned, hedges trimmed?", "Flower beds weeded and tidy; dead plants replaced?", "'Junk' and scrap removed?", "Lawn furniture clean, organized, good repair?", "Bicycles, children's toys stored neatly, out of way?", "Firewood organized and neatly stacked?", "Yard free of 'doggy deposits'?"]
  }
];

const SellingPreparationChecklist = () => {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <ArticleLayout
      title="Home Preparation Checklist"
      subtitle="To get the best return on your home, you need to make your home look its best. Here's the checklist that will help you do it."
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      cta={{
        title: "Need Help Preparing Your Home?",
        description: "Contact Sanjeev Manocha for personalized advice on preparing your home for sale.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
      maxWidth="max-w-5xl"
    >
      {/* Download Button */}
      <div className="mb-10 flex justify-center print:hidden">
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-2 bg-primary px-8 py-3 text-xs font-body font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Download as PDF
        </button>
      </div>

      {/* Inside Your Home */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Inside Your Home</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {insideChecklist.map((section, index) => (
            <div key={index} className="article-card rounded-sm p-6">
              <h4 className="font-display text-base font-semibold text-foreground mb-3">{section.category}</h4>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <div className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-muted-foreground/30" />
                    <span className="text-sm text-muted-foreground font-body font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Outside Your Home */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Outside Your Home</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {outsideChecklist.map((section, index) => (
            <div key={index} className="article-card rounded-sm p-6">
              <h4 className="font-display text-base font-semibold text-foreground mb-3">{section.category}</h4>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <div className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-muted-foreground/30" />
                    <span className="text-sm text-muted-foreground font-body font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ArticleLayout>
  );
};

export default SellingPreparationChecklist;
