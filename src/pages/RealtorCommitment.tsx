import ArticleLayout from "@/components/ArticleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, FileCheck, Heart, Shield, AlertCircle, Database } from "lucide-react";

const commitments = [
  {
    icon: GraduationCap,
    title: "Your REALTOR is Highly Trained",
    description: "REALTOR training is so rigorous that candidates often fail the pre-registration courses. Those who do pass must master a long, diverse list of subjects ranging from housing construction to family law.",
  },
  {
    icon: BookOpen,
    title: "Your REALTOR is Continuously Trained",
    description: "We keep pace with the times. All Licensed REALTORS must take continuing education courses to make sure their knowledge on subjects like legal issues and technology are up to date.",
  },
  {
    icon: FileCheck,
    title: "Your REALTOR Does Everything by the Book",
    description: "A licensed REALTOR must be registered under provincial laws that govern exactly how real estate can and cannot be traded. These regulations are your legal guarantee of professional behavior.",
  },
  {
    icon: Heart,
    title: "Your REALTOR is an Ethical Businessperson",
    description: "REALTORS must adhere to the extensive Code of Ethics of the Canadian Real Estate Association. Several provinces have additional Codes of Ethics governing the behaviour of real estate professionals. Your interests must always be put first.",
  },
  {
    icon: Shield,
    title: "Your Dealings with a REALTOR are Insured",
    description: "For your peace of mind, provincial regulators sponsor consumer protection programs that may require, for instance, that REALTORS maintain Errors and Omissions Insurance. Often deposits consumers make in real estate transactions are also insured under these programs.",
  },
  {
    icon: AlertCircle,
    title: "Opportunity for Recourse",
    description: "Should you have concerns about the professional behavior of a REALTOR, provincial regulators and your local real estate board or association take these matters very seriously and work quickly to resolve any issues.",
  },
  {
    icon: Database,
    title: "Your REALTOR has Access to MLS",
    description: "The MLS system is the single most powerful tool for buying and selling a home. It is a complex information-sharing and cooperative marketing network created by REALTORS to help consumers buy and sell homes.",
  },
];

const RealtorCommitment = () => {
  return (
    <ArticleLayout
      title="The REALTOR Commitment"
      subtitle="You're trusting a REALTOR with your most valuable possession, your home. REALTORS take this responsibility very seriously. Here's what we promise you."
      backTo="/buying-tips"
      backLabel="Back to Buying Tips"
    >
      <div className="space-y-5">
        {commitments.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="article-card">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-xl font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body font-light leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center text-xs font-body text-muted-foreground tracking-wide">
        Source: OREA (Ontario Real Estate Association) –{" "}
        <a 
          href="http://www.howrealtorshelp.ca" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          www.howrealtorshelp.ca
        </a>
      </div>
    </ArticleLayout>
  );
};

export default RealtorCommitment;
