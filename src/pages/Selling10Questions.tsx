import ArticleLayout from "@/components/ArticleLayout";
import AnimatedSection from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
  {
    number: 1,
    question: "How long have you been in the business?",
    answer: "A freshly-licensed REALTOR can do a wonderful job and will have up-to-date training; those in the business longer bring more practical experience to the table."
  },
  {
    number: 2,
    question: "What is your average list-to-sales-price ratio?",
    answer: "A competent listing REALTOR should hold a track record for negotiating sales prices that are very close to list prices."
  },
  {
    number: 3,
    question: "How will your marketing plan meet my needs?",
    answer: "Specifically, how will you sell my home? Where and how often do you advertise? Will you show me a sample flyer? How do you market online?"
  },
  {
    number: 4,
    question: "Will you provide references?",
    answer: "Ask if any of the references are related to the REALTOR. Ask if you can call their references with additional questions."
  },
  {
    number: 5,
    question: "What separates you from your competition?",
    answer: "Key phrases to listen for: assertive, available by phone or e-mail, analytical, professional, reliable, and able to maintain a good sense of humour under trying circumstances."
  },
  {
    number: 6,
    question: "May I review documents that I will be asked to sign?",
    answer: "A good REALTOR makes forms available to you before you are required to sign them. Ask to see agency disclosure, the listing agreement and seller disclosure."
  },
  {
    number: 7,
    question: "How will you help me find other professionals?",
    answer: "Ask for a written list of referring vendors. Get an explanation if you see the term 'affiliated'. It could mean the REALTOR is getting compensation from vendors."
  },
  {
    number: 8,
    question: "How much do you charge?",
    answer: "You don't have to ask if the fee is negotiable, since all real estate fees are negotiated. It may be a good idea to ask what their commission fee is for your reference."
  },
  {
    number: 9,
    question: "What kind of guarantee do you offer?",
    answer: "If you sign a listing agreement with the REALTOR and later find that you are unhappy with the arrangement, will the REALTOR let you cancel the agreement?"
  },
  {
    number: 10,
    question: "What haven't I asked you that I need to know?",
    answer: "Pay close attention to how the REALTOR answers this question, because there is always something you need to know—always."
  }
];

const Selling10Questions = () => {
  return (
    <ArticleLayout
      title="10 Questions to Ask When Hiring a REALTOR"
      subtitle="Homeowners should interview a few potential REALTORS before deciding on one to sell their home. Here are some smart questions to ask."
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      cta={{
        title: "Ready to Work With a Professional?",
        description: "Contact Sanjeev Manocha for a no-obligation consultation about selling your home.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {questions.map((item) => (
          <AnimatedSection key={item.number} delay={item.number * 0.06}>
            <Card className="article-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-4 font-display text-lg font-semibold">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary font-display text-lg font-bold">
                    {item.number}
                  </span>
                  <span className="leading-snug">{item.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-20">
                <p className="text-muted-foreground font-body font-light leading-relaxed text-sm">{item.answer}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </ArticleLayout>
  );
};

export default Selling10Questions;
