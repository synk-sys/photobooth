import ArticleLayout from "@/components/ArticleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const expectations = [
  {
    title: "Your REALTOR Explains the Process",
    description: "A REALTOR will not take it for granted that you know all the ins and outs of the buying process. Instead, he or she will provide you with a detailed explanation of what to expect so you are fully informed throughout this complex decision-making process."
  },
  {
    title: "REALTORS Assess Your Needs",
    description: "One of the first questions a REALTOR will ask is, 'Why are you moving?' A REALTOR will also explore any time constraints you might have, your financial situation and any future plans. They need a detailed picture of your wants and needs in order to serve you better."
  },
  {
    title: "A Plan to Find Your Dream Home",
    description: "A REALTOR will help you recognize what you're looking for in a new home. An outdoor pool? A double-car garage? A fenced-in yard? A particular building design? What about the neighbourhood? A REALTOR will compare your needs, wants and budget with what is available on the market."
  },
  {
    title: "Access to Properties for Sale",
    description: "Multiple Listing Service or MLS is an exclusive service accessible only through a REALTOR and it can be a valuable home-searching tool. Through MLS, the details of a wide variety of listed properties are made available to the REALTOR you work with."
  },
  {
    title: "REALTORS are Skilled Negotiators",
    description: "REALTORS are experienced in arranging fair deals. Your Agent will assist in negotiating an offer, acting as a mediator to resolve potential conflicts between you and the seller, and draw up a legally binding agreement."
  },
  {
    title: "Honesty and Integrity",
    description: "Most real estate professionals in Ontario are members of the Ontario Real Estate Association (OREA) and only members of OREA can call themselves REALTORS. When you work with a REALTOR, you can expect strict adherence to provincial laws and a Code of Ethics."
  },
  {
    title: "Legal Know-How",
    description: "A mishandled document can ruin a sale, or lead to legal action. Your REALTOR has the experience to recognize potential problems early and the resources to help you find solutions and get the process back on track quickly."
  }
];

const SellingRealtorExpectations = () => {
  return (
    <ArticleLayout
      title="What to Expect From Your REALTOR"
      subtitle="REALTORS help you get the most for your home and they remove stress and confusion from the process. Here are just some of the advantages."
      backTo="/selling-tips"
      backLabel="Back to Selling Tips"
      cta={{
        title: "Experience Professional Service",
        description: "Contact Sanjeev Manocha to experience the difference a professional REALTOR can make.",
        linkTo: "/contact",
        linkLabel: "Contact Sanjeev",
      }}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {expectations.map((item, index) => (
            <Card key={index} className="article-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-lg font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-xs font-body text-muted-foreground tracking-wide">
        Source: OREA (Ontario Real Estate Association) –{" "}
        <a href="http://www.howrealtorshelp.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          www.howrealtorshelp.ca
        </a>
      </div>
    </ArticleLayout>
  );
};

export default SellingRealtorExpectations;
