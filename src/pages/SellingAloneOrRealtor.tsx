import ArticleLayout from "@/components/ArticleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const considerations = [
  {
    question: "Will you really \"save\" the real estate commission?",
    answer: "When buyers see a home for sale 'by the owner', they see a bargain. They imagine the REALTORS fee going into their pocket, not yours."
  },
  {
    question: "Are you familiar with real estate law?",
    answer: "Complicated and ever changing, real estate law governs nearly every phase of selling your home. One wrong move and an entire deal can fall through, or worse, a lawsuit can ensue."
  },
  {
    question: "How many potential buyers will you reach?",
    answer: "Selling a home takes more than just hanging a 'For Sale' sign. How will you promote your home? Will you write your own ads? How will you use the Internet, knowing that you'll have no inside access to MLS and therefore will not be able to post your home on this service?"
  },
  {
    question: "Do you have the time?",
    answer: "Promoting a home is a full time job, and you may already have one. Will you be able to take calls at any time? How about screening the callers to figure out if they're qualified to buy your home? Not everybody who calls is even suitable to walk through your home, but how do you tell?"
  },
  {
    question: "Do you know the market well enough to get the most for your home?",
    answer: "Lacking years of experience, the average do-it-yourselfer is merely guessing at their listing price. Often they set the price too low and miss out on thousands of dollars, or they price their home too high and drive away willing buyers."
  },
  {
    question: "What about your selling skills?",
    answer: "If the personalities of prospective buyers rub you the wrong way, can you still deal with them effectively? What about your own defensiveness when you hear negative comments about your home? Best to keep it at arms length through a REALTOR."
  },
  {
    question: "Do you have the negotiation skills to keep a deal on track?",
    answer: "When an offer comes in, emotions can run high with so much money on the line. This is why direct seller-to-buyer deals often end in disaster. REALTORS keep it professional and are indispensable when it comes to bargaining with buyers."
  }
];

const SellingAloneOrRealtor = () => {
  return (
    <ArticleLayout
      title="Do it Alone, or Use a REALTOR?"
      subtitle="The fact is, most people who try to sell their own home end up using a REALTOR in the end anyway. Before anybody decides to fly solo through this complex, time consuming and financially perilous process, they should consider these questions."
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      cta={{
        title: "Get Professional Help Selling Your Home",
        description: "Contact Sanjeev Manocha for a free consultation and discover how a professional REALTOR can help you get the best price for your home.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
    >
      {/* Warning Card */}
      <Card className="mb-10 border-amber-500/30 bg-amber-50/30">
        <CardContent className="flex items-start gap-4 pt-6">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800 font-body leading-relaxed">
            Selling your home is one of the biggest financial transactions of your life. Consider carefully whether you have the time, knowledge, and skills to handle it on your own.
          </p>
        </CardContent>
      </Card>

      {/* Considerations */}
      <div className="space-y-5">
        {considerations.map((item, index) => (
          <Card key={index} className="article-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-xl font-semibold text-foreground">
                {item.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body font-light leading-relaxed">{item.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ArticleLayout>
  );
};

export default SellingAloneOrRealtor;
