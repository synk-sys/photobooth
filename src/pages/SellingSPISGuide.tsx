import ArticleLayout from "@/components/ArticleLayout";
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Shield, ClipboardList, HelpCircle } from "lucide-react";
import spisFormImage from "@/assets/spis-form-220.jpg";

const SellingSPISGuide = () => {
  return (
    <ArticleLayout
      title="Seller Property Information Statement (SPIS)"
      subtitle="Understanding OREA Form 220 and when to use it when selling your home in Ontario."
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      icon={<FileText className="h-6 w-6" />}
      cta={{
        title: "Need Guidance on Property Disclosure?",
        description: "Sanjeev Manocha can help you navigate the complexities of property disclosure and ensure you're properly protected throughout the selling process.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
      maxWidth="max-w-4xl"
    >
      {/* Introduction */}
      <div className="rounded-sm border border-primary/20 bg-primary/5 p-8 md:p-10 mb-10">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-foreground">What is the SPIS?</h2>
            <p className="text-muted-foreground font-body font-light leading-relaxed">
              The Seller Property Information Statement (SPIS), also known as OREA Form 220, is a disclosure document 
              created by the Ontario Real Estate Association. It is designed to help sellers provide potential buyers 
              with detailed information about the property's condition, history, and any known issues.
            </p>
            <div className="mt-6">
              <img 
                src={spisFormImage} 
                alt="OREA Form 220 - Seller Property Information Statement sample" 
                className="rounded-sm border shadow-md max-w-full md:max-w-2xl"
              />
              <p className="mt-2 text-xs text-muted-foreground font-body italic tracking-wide">
                Sample of OREA Form 220 - Seller Property Information Statement (Residential)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose Section */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">Purpose of the SPIS</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Shield, title: "Seller Protection", text: "The SPIS is designed in part to protect sellers by establishing that correct information concerning the property is being provided to buyers." },
            { icon: Scale, title: "Buyer Transparency", text: "The document provides buyers with valuable information they might not otherwise discover during a standard home inspection." },
          ].map((item) => (
            <div key={item.title} className="article-card rounded-sm p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-display text-base font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What Must Be Disclosed */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">What Must a Seller Disclose?</h2>
        <div className="article-card rounded-sm p-8">
          <p className="mb-4 text-muted-foreground font-body font-light leading-relaxed">
            In Ontario, there is generally no legal requirement for sellers to disclose defects to buyers. The principle 
            of "caveat emptor" (buyer beware) largely applies. However, there are important exceptions:
          </p>
          <div className="space-y-4">
            {[
              { title: "Latent Defects", text: "Sellers must disclose latent (hidden) defects that render the property dangerous or unfit for habitation." },
              { title: "No Fraudulent Concealment", text: "Sellers cannot actively conceal defects or take steps to hide problems from buyers." },
              { title: "No Misrepresentation", text: "If asked a direct question, sellers must answer truthfully. Providing false information constitutes misrepresentation." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-sm bg-destructive/5 border border-destructive/10 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <h4 className="font-body font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground font-body font-light">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SPIS Content */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">What the SPIS Covers</h2>
        <p className="mb-6 text-muted-foreground font-body font-light leading-relaxed">
          The SPIS (Form 220) asks sellers to provide information about various aspects of the property:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "General Property Information", "Environmental Issues (UFFI, asbestos, radon)", "Structural Components",
            "Mechanical Systems (HVAC, plumbing, electrical)", "Water Supply and Sewage", "Roof Condition and Age",
            "Basement and Foundation", "Zoning and Building Permits", "Insurance Claims History",
            "Neighbourhood Issues", "Known Defects or Problems", "Legal Matters Affecting Property",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-sm border border-border/50 bg-card p-3">
              <ClipboardList className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-xs font-body text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">Should You Use the SPIS?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="article-card rounded-sm p-6 border-green-500/20">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h4 className="font-display text-base font-semibold text-green-600 mb-3">Arguments FOR Using SPIS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-body font-light">
              {["Documents what you knew and disclosed", "Shows good faith to potential buyers", "May help defend against future claims", "Buyers appreciate the transparency", "OREA and RECO recommend its use"].map((t) => (
                <li key={t} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="article-card rounded-sm p-6 border-destructive/20">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <XCircle className="h-5 w-5" />
            </div>
            <h4 className="font-display text-base font-semibold text-destructive mb-3">Arguments AGAINST Using SPIS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-body font-light">
              {["Creates a written record that could be used against you", "Inadvertent errors may be seen as misrepresentation", "Many Ontario lawyers advise against using it", "You may unknowingly warrant conditions", "Limited protection if information is incomplete"].map((t) => (
                <li key={t} className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Considerations */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">Important Legal Considerations</h2>
        <div className="space-y-4">
          {[
            { icon: Scale, title: "Doctrine of Merger", text: "Generally, representations made before closing 'merge' with the deed and cannot be relied upon after closing. However, if the SPIS is made a schedule to the Agreement of Purchase and Sale, its representations may survive closing." },
            { icon: FileText, title: "Representations and Warranties", text: "The standard Agreement of Purchase and Sale includes a clause stating that the buyer has relied upon their own inspection. However, if an SPIS is attached as a schedule, buyers may argue they relied on those representations." },
            { icon: Shield, title: "Informed Consent (Form 225)", text: "OREA also provides Form 225, an Informed Consent form for the SPIS. This form acknowledges that both parties understand the limitations of the SPIS." },
          ].map((item) => (
            <div key={item.title} className="article-card rounded-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="h-5 w-5 text-primary" />
                <h4 className="font-display text-base font-semibold text-foreground">{item.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">Best Practices if You Choose to Use SPIS</h2>
        <div className="article-card rounded-sm p-8">
          <ul className="space-y-4">
            {[
              { title: "Be Completely Honest", description: "Answer all questions truthfully and completely. If you're unsure, say so." },
              { title: "Use 'Unknown' Appropriately", description: "If you genuinely don't know the answer, mark it as 'Unknown' rather than making assumptions." },
              { title: "Attach Supporting Documents", description: "Include copies of any relevant reports, permits, or documentation." },
              { title: "Review with Your REALTOR", description: "Go through the form carefully with your real estate agent." },
              { title: "Consider Legal Advice", description: "Consult with a real estate lawyer before completing the SPIS." },
              { title: "Keep Copies", description: "Maintain copies of the completed SPIS and any related documentation." },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground font-body font-light">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { question: "Is the SPIS mandatory in Ontario?", answer: "No, the SPIS is not legally required. It is a voluntary disclosure document." },
            { question: "Can a buyer make an offer conditional on receiving an SPIS?", answer: "Yes, buyers can include a condition in their offer requiring the seller to complete and provide an SPIS." },
            { question: "What if I make a mistake on the SPIS?", answer: "Innocent mistakes may still create liability if the buyer relied on the incorrect information." },
            { question: "Does the SPIS replace a home inspection?", answer: "Absolutely not. Buyers should always conduct their own professional home inspection." },
            { question: "What forms have replaced or supplemented the SPIS?", answer: "While Form 220 is still available, some practitioners now use Forms 820-825." },
          ].map((faq, index) => (
            <div key={index} className="article-card rounded-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h4 className="font-body font-semibold text-foreground text-sm">{faq.question}</h4>
              </div>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </ArticleLayout>
  );
};

export default SellingSPISGuide;
