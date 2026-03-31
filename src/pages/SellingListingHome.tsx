import ArticleLayout from "@/components/ArticleLayout";

const sections = [
  {
    id: "placing",
    title: "Placing Your Home on the Market",
    content: [
      {
        subtitle: "Listing Broker",
        text: "An individual real estate broker whom the seller hires to represent themselves through a contract called a 'listing agreement'. The listing Sales Representative is associated with the listing broker. The listing broker is directly paid the listing commission and then splits the commission with the listing Sales Representative."
      },
      {
        subtitle: "Selling Broker",
        text: "An individual who produces a buyer for the property and divides the commission with a listing broker. Such a transaction is considered a 'co-operative' sale because the house is listed by one broker and a buyer is provided by a second broker."
      }
    ]
  },
  {
    id: "homework",
    title: "A Little Homework",
    content: [
      {
        subtitle: "",
        text: "Before the listing appointment, both the home seller and the listing Sales Representative have some homework to do. While the home seller collects a list of documents requested by the Sales Representative, the listing Sales Representative studies recent area sales of homes comparable to the seller's, and also comparable homes currently for sale."
      }
    ]
  },
  {
    id: "features",
    title: "Your Home's Special Features",
    content: [
      {
        subtitle: "",
        text: "At the listing appointment, the listing Sales Representative will want to inspect the entire home and yard to become familiar with its special features and exact floor plan. You have probably enjoyed living in your home and have been pleased with its many unique features. Your listing Sales Representative will want to tell prospective buyers about the special features of your home and community."
      },
      {
        subtitle: "",
        text: "Be ready to be specific about schools, churches, daycare, nearby metro, and other desirable community features, as well as home features not readily apparent. Remember, prospective buyers will be 'comparison shopping' and keenly aware of subtle differences in homes for sale in the area. Be sure to tell your listing Sales Representative why yours is special, from any home remodeling to afternoon winter sunshine."
      }
    ]
  },
  {
    id: "profile",
    title: "Property Profile Folder",
    content: [
      {
        subtitle: "Documents to Prepare",
        text: "To enable the listing Sales Representative to prepare a 'Highlight Sheet' on the property, the home seller needs to provide a number of documents and information specific to the location and jurisdiction."
      },
      {
        subtitle: "Pay-Off Notice",
        text: "A letter signed by the home seller and mailed to the lender by the listing broker to notify the lender of the intention to pay off the mortgage."
      },
      {
        subtitle: "Septic and Well Inspection",
        text: "If property is on septic/well, current inspections by local health authorities are required while the home is occupied."
      },
      {
        subtitle: "Assessments/Easements",
        text: "The listing Sales Representative will ask the home seller if any tax assessments or easements exist on the property."
      },
      {
        subtitle: "Property Taxes/Condominium Fees",
        text: "The home seller provides a record of property tax or condominium fee payments which the buyer will reimburse on a prorate share."
      },
      {
        subtitle: "Helpful Documents",
        text: "If possible, provide the deed, house location survey, condominium bylaws, subdivision map, house floor plan, previous title search abstracts, legal description of property, warranties on major systems, and copy of home owners insurance policy."
      }
    ]
  },
  {
    id: "conveys",
    title: "What Conveys?",
    content: [
      {
        subtitle: "",
        text: "In anticipation of a buyer's offer, the home seller must be ready to supply the listing Sales Representative with a specific list of the personal property that is included in the real estate property for sale."
      },
      {
        subtitle: "Examples of items to 'convey'",
        text: "Draperies, drapery rods, remaining heating oil, firewood, washer, dryer, refrigerator, stove, microwave, disposal, swimming pool chemicals, awnings, storm doors and windows, screens, blinds, shutters, window air conditioner, etc. Home seller should tag or remove items which do not convey."
      }
    ]
  },
  {
    id: "cma",
    title: "Comparative Market Analysis",
    content: [
      {
        subtitle: "Maximizing Market Value",
        text: "Preparing a Comparative Market Analysis (CMA) is an important tool Sales Representatives use to help you earn the highest possible price for your home. A CMA involves looking at the public records of real estate business in your community to better understand market conditions."
      },
      {
        subtitle: "Four steps to prepare your home's CMA",
        text: "1. Your REALTOR will consider the amount paid for at least 3 recently sold homes in your community. 2. Your REALTOR will consider the asking prices of at least 3 presently listed homes. 3. Your REALTOR will consider the asking prices of at least 3 homes that went unsold for at least 90 days. 4. Your REALTOR will use all the price information gathered to arrive at an ideal asking price for your home."
      }
    ]
  }
];

const SellingListingHome = () => {
  return (
    <ArticleLayout
      title="Listing Your Home"
      subtitle={'The first step toward putting your home up for sale is to meet with your REALTOR at your home. This meeting is referred to as the "listing appointment". Beforehand, it\'s also important to understand "who\'s who" and how brokers may co-operate to sell your home.'}
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      cta={{
        title: "Ready to List Your Home?",
        description: "Get a free home valuation and professional listing consultation from Sanjeev Manocha.",
        linkTo: "/home-valuation",
        linkLabel: "Get Your Free Home Valuation",
      }}
      maxWidth="max-w-4xl"
    >
      {/* Quick Navigation */}
      <div className="article-card rounded-sm p-8 mb-12">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Navigation</h3>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-sm border border-border/50 px-4 py-2 text-xs font-body font-medium uppercase tracking-[0.15em] text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections Content */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="article-card rounded-sm p-8 md:p-10 scroll-mt-24">
            <h3 className="font-display text-xl font-semibold text-primary md:text-2xl mb-6">{section.title}</h3>
            <div className="space-y-4">
              {section.content.map((item, index) => (
                <div key={index}>
                  {item.subtitle && (
                    <h4 className="mb-2 font-body font-semibold text-foreground">{item.subtitle}</h4>
                  )}
                  <p className="text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ArticleLayout>
  );
};

export default SellingListingHome;
