import ArticleLayout from "@/components/ArticleLayout";

const TitleInsurance = () => {
  return (
    <ArticleLayout
      title="Title Insurance"
      subtitle="Understanding title insurance and how it protects your most valuable investment."
      backTo="/buying-tips"
      backLabel="Back to Buying Tips"
      
      maxWidth="max-w-4xl"
    >
      <div className="space-y-8">
        {[
          {
            
            title: "What is Title Insurance?",
            content: [
              "Title insurance is protection against loss arising from problems connected to the title of your property. Before you purchased your home, it may have gone through several ownership changes, and the land on which it stands went through many more. There may be a weak link at any point in that chain that could emerge to cause trouble.",
              "For example, someone along the way may have forged a signature in transferring title. Or there may be unpaid real estate taxes or other liens. Title insurance covers the insured party for any claims and legal fees that arise out of such problems.",
              "Prior to closing, public records are \"searched\" to determine the previous ownership of the property, as well as prior dealings related to it. At closing the buyer expects property that is free and clear of such claims, so typically they must be cleared up before closing.",
              "Occasionally problems regarding title are not discovered before closing, or are not remedied before closing. Such defects can make the property less marketable when the buyer subsequently sells and, depending on the nature of the problem, can also cost money to remedy.",
            ],
          },
          {
            
            title: "Am I Required to Purchase Title Insurance?",
            content: [
              "Title Insurance is required if you need a mortgage, because all mortgage lenders require such protection for an amount equal to the loan. It lasts until the loan is repaid. As with mortgage insurance, it protects the lender but you pay the premium, which is a single-payment made upfront.",
            ],
          },
          {
            
            title: "Who is Protected with Title Insurance?",
            content: [
              "Title insurance policies can be issued in favour of a purchaser (on new/resale homes, condos and vacation properties), a lender, or both the purchaser and lender.",
            ],
            list: [
              "Survey irregularities",
              "Forced removal of existing structures",
              "Claims due to fraud, forgery or duress",
              "Unregistered easements and rights-of-way",
              "Lack of pedestrian or vehicular access to the property",
              "Work orders",
              "Zoning and set back non-compliance or deficiencies",
            ],
            listTitle: "Risks Frequently Covered",
            afterList: "For a risk to be covered, usually it has to have existed as of the date of the policy. As with any type of insurance policy, certain types of risks might not be covered—for example, native land claims and environmental hazards are normally excluded.",
          },
          {
            
            title: "When Does the Insurance Coverage End?",
            content: [
              "**For Purchasers:** When the title insurance is covering the purchaser, it remains in effect as long as the insured purchaser has title to the land. Some policies also protect those who received title as a result of the purchaser's death.",
              "**For Lenders:** When the title insurance is covering the lender, the policy remains in effect as long as the mortgage remains on title.",
              "**Premium Payment:** The premium for title insurance is paid once (at the time of purchase). Generally speaking, in Canada the purchaser of the property pays for the title insurance.",
            ],
          },
          {
            
            title: "Protection and Peace of Mind",
            content: [
              "Title insurance can help ensure that a closing is not delayed due to defects in title. And, if an issue relating to title arises with respect to a risk covered under the policy, the title insurance covers the legal fees and expenses associated with defending the insured's title and pays in the event of loss.",
            ],
          },
        ].map((section) => (
          <div key={section.title} className="article-card rounded-sm p-8 md:p-10">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">{section.title}</h2>
            <div className="space-y-4">
              {section.content.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground font-body font-light leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>') }}
                />
              ))}
              {section.listTitle && (
                <h4 className="font-display text-base font-semibold mt-6">{section.listTitle}</h4>
              )}
              {section.list && (
                <ul className="list-disc pl-6 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="text-muted-foreground font-body font-light">{item}</li>
                  ))}
                </ul>
              )}
              {section.afterList && (
                <p className="text-muted-foreground font-body font-light leading-relaxed mt-4">{section.afterList}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </ArticleLayout>
  );
};

export default TitleInsurance;
