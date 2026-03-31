import ArticleLayout from "@/components/ArticleLayout";

const SellingImportantDocuments = () => {
  return (
    <ArticleLayout
      title="Important Documents to Have When Selling Your Home"
      subtitle="When you begin the process of selling your home, start by gathering the information you need to present to agents, lawyers, and potential buyers. This will set the foundation for everyone to work upon and ensure things are as clear as possible when it comes time to finalize the sale."
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      cta={{
        title: "Need Help Selling Your Home?",
        description: "Get expert guidance from Sanjeev Manocha to ensure you have all the necessary documents and achieve the best value for your property.",
        linkTo: "/home-valuation",
        linkLabel: "Get Your Free Home Valuation",
      }}
      maxWidth="max-w-4xl"
    >
      {/* Introduction */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-8">
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-4">
          These crucial documents will serve many functions. They will prove that you have the right to sell the property, offer up information about the details of the home, and provide evidence of the current carrying costs.
        </p>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-4">
          Many pieces of information are mandatory for you to show in any sale, but a few are specific to the home type you are selling. Some are optional and used to build trust with buyers by displaying your resolve in selling your home.
        </p>
        <p className="text-foreground font-body font-medium">
          Avoid delaying the sales transaction by making sure you have all the essential papers and records prepared in advance!
        </p>
      </div>

      {/* What You'll Learn */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">What You'll Learn</h3>
        <ul className="grid gap-2 md:grid-cols-2">
          {["Proof of Ownership", "Homeowning Responsibilities", "Details, History, and Condition", "Other Documents Based on Property Type", "Optional Documents", "Key Takeaways"].map((item) => (
            <li key={item} className="flex items-center gap-2 font-body text-sm">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Proof of Ownership */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-8">
        <h3 className="font-display text-xl font-semibold text-foreground mb-6">Proof of Ownership</h3>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">
          The most crucial documentation to begin a home sale is the proof of ownership. Typically, this comes in the form of the Transfer/Deed of Land, the original Agreement of Purchase and Sale (APS) from when you first bought the property, or the Mortgage Contract. You will not be allowed to sell the property without proof of ownership.
        </p>
        <div className="space-y-4">
          {[
            { title: "Transfer/Deed of Land", text: "This document shows the official transfer of ownership for the property. It is usually registered by the lawyer with the Ontario Land Registry Office (LRO), and a copy can be obtained from the official OnLand website." },
            { title: "Agreement of Purchase and Sale", text: "This comprehensive and standardized document details the original transaction between the property's current owner and the previous seller. If you have misplaced the APS, you may be able to request a copy from the real estate agent or lawyer who handled the transaction. The Ontario Land Registry Office may also have a copy." },
            { title: "Mortgage Contract", text: "Most home purchases are made with a mortgage loan, so your mortgage contract will provide details of the sale and the financial liability. This document can also provide vital information about encumbrances on the property, as the mortgage lender will have a claim to the home if the mortgage has not been fully paid off. To supplement this information, you may also want to print out the current status of the mortgage to show how much you currently owe." },
          ].map((item) => (
            <div key={item.title} className="border-l-2 border-primary/30 pl-4">
              <h4 className="font-body font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Homeowning Responsibilities */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-8">
        <h3 className="font-display text-xl font-semibold text-foreground mb-6">Homeowning Responsibilities</h3>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">
          The recurring costs of homeownership include property taxes, utility bills, and (in the case of condo owners) maintenance fees. Future buyers will want to know how much these monthly and yearly carrying costs will be.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Property Taxes", text: "You will need to produce your property tax bill and, if required, proof of the most recent payment to show that you are not behind on paying your taxes." },
            { title: "Utility Bills", text: "You will need your utility bills and recent payment to show that you have been paying the electricity, heat, and water costs." },
            { title: "Condo Maintenance Fees", text: "For condo owners, you should also do the same thing with your condo maintenance fees. These costs are also essential information to include on your home listing." },
          ].map((item) => (
            <div key={item.title} className="rounded-sm border border-border/50 bg-card p-4">
              <h4 className="font-body font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details, History, and Condition */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-8">
        <h3 className="font-display text-xl font-semibold text-foreground mb-6">Details, History, and Condition</h3>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">
          Other important information that agents, lawyers, and buyers will want to see is the details of the property. With a full set of facts, they can have a clearer picture of the property's history and condition to make vital value assessments.
        </p>
        <div className="space-y-4">
          {[
            { title: "Building Permits & Renovation/Repair Contracts", text: "If you have made any changes to the property (adding or removing structures or conducting major renovations), you should have the proper building permits from the city. These permits confirm that the changes were made legally according to the building code." },
            { title: "Land Survey", text: "A survey will provide a definitive overview of the property's boundaries, showing its size and any attached buildings or roads. You can hire a licensed land surveyor to conduct a new survey or see if a pre-existing one can be found at the LRO." },
            { title: "Insurance Records", text: "Your property should be insured, so any insurance claims you have made, such as theft or damage, can help document the home's history. If you do not have the documents at home, your insurance provider should have complete records." },
          ].map((item) => (
            <div key={item.title} className="border-l-2 border-primary/30 pl-4">
              <h4 className="font-body font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other Documents Based on Property Type */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-8">
        <h3 className="font-display text-xl font-semibold text-foreground mb-6">Other Documents Based on Property Type</h3>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">
          If you have a specific type of home, there are a couple more documents to consider.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Condo Status Certificate", text: "Condo buildings have governing documents and financial records that make up the status certificate. You can request this multi-page document from the condo property manager (usually for a fee) to show buyers how the building is doing financially." },
            { title: "Heritage Property", text: "If your house has a heritage designation, is on the heritage registry, or is part of a heritage conservation district, owners must follow additional rules about maintaining the building, changing the facade, or demolishing it." },
          ].map((item) => (
            <div key={item.title} className="rounded-sm border border-border/50 bg-card p-4">
              <h4 className="font-body font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Documents */}
      <div className="article-card rounded-sm p-8 md:p-10 mb-8">
        <h3 className="font-display text-xl font-semibold text-foreground mb-6">Optional Documents</h3>
        <p className="text-muted-foreground font-body font-light leading-relaxed mb-6">
          Lastly, some documents provide more information to buyers but are entirely optional.
        </p>
        <div className="space-y-4">
          {[
            { title: "Home Inspection Report", text: "A seller can provide a home inspection report to show its current condition and help the buyer save time and money on their due diligence." },
            { title: "Seller Property Information Statement (SPIS)", text: "An SPIS (OREA Form 220) is a quick list of information about the property and neighbourhood, including defects and disputes, that the seller can provide voluntarily." },
            { title: "Other Warranties", text: "For major appliances and upgrades, such as the furnace, roof, or stove, you may be able to transfer the product warranty to the new owner." },
          ].map((item) => (
            <div key={item.title} className="border-l-2 border-muted-foreground/20 pl-4">
              <h4 className="font-body font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="rounded-sm border border-primary/20 bg-primary/5 p-8 md:p-10">
        <h3 className="font-display text-xl font-semibold text-foreground mb-4">Key Takeaways</h3>
        <ul className="space-y-3">
          {[
            "It's essential to have and provide as much information as possible when starting a home sale.",
            "Sellers must provide proof of ownership to sell their property.",
            "Buyers want to know the related costs of owning, including the property taxes, utility bills, and maintenance fees.",
            "Other vital documents clarify the property's details, history, and condition.",
            "Building-specific documents, like the condo status certificate, and optional documents, like home inspection reports, offer even more information about a property.",
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
              <span className="text-muted-foreground font-body font-light text-sm leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </ArticleLayout>
  );
};

export default SellingImportantDocuments;
