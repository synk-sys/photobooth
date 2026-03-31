import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  FileText, 
  Home, 
  Shield, 
  BarChart3, 
  ListChecks,
  FileCheck,
  Calculator,
  CheckCircle2
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Passive Income Opportunity",
    description: "Generate steady rental income from your investment property"
  },
  {
    icon: BarChart3,
    title: "FREE Market Rent Analysis",
    description: "Receive a comprehensive analysis of current market rental rates"
  },
  {
    icon: TrendingUp,
    title: "Build Equity & Cash Flow",
    description: "Build equity and positive cash flow on your investment property"
  },
  {
    icon: Users,
    title: "Find Qualified Tenants",
    description: "We'll help you find and vet qualified tenants for your property"
  }
];

const services = [
  {
    icon: BarChart3,
    title: "FREE Rental Market Analysis",
    description: "Get a comprehensive analysis of current market rental rates in your area"
  },
  {
    icon: TrendingUp,
    title: "Rental Rate Statistics",
    description: "Access rental rate statistics and trends over the last thirty years"
  },
  {
    icon: Home,
    title: "MLS Listing",
    description: "List your unit on MLS for maximum exposure to potential tenants"
  },
  {
    icon: Shield,
    title: "Tenant Vetting",
    description: "Thorough tenant screening including employment letter, notice of assessment, and credit report"
  },
  {
    icon: FileText,
    title: "Lease Negotiation",
    description: "Negotiate rent on your behalf, provide completed Agreement to Lease forms and collect all deposits"
  },
  {
    icon: ListChecks,
    title: "Landlord & Tenant Board Guidance",
    description: "Guidance on regulations including rental increases and providing notices"
  },
  {
    icon: FileCheck,
    title: "Buyer Incentives",
    description: "Explain buyer incentives including interim occupancy and the right to lease"
  },
  {
    icon: Calculator,
    title: "HST Rental Rebate",
    description: "Education and resources on how to obtain the HST rental rebate"
  }
];

const LeasingServices = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Leasing Services
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  Providing You With the Knowledge and Resources You Need to Rent Your Condo Unit
                </p>
                <p className="text-muted-foreground mb-8">
                  We are a team of experienced real estate professionals that specialize in the rental market. 
                  If you are a landlord or a condo investor looking to rent your unit, we will be happy to 
                  assist you and provide you with all the information you need to find a qualified tenant.
                </p>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{benefit.title}</h3>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contact Form */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Get Started Today</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Register with us to learn more about our leasing services
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="First Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Last Name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Email Address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="Phone Number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea id="message" placeholder="Tell us about your property..." rows={4} />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Submit Inquiry
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to our Privacy Policy and Terms of Use.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Offer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive leasing services to help you maximize your rental investment
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Why Choose Our Leasing Services?
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Expert Market Knowledge</h3>
                      <p className="text-muted-foreground text-sm">
                        We have extensive knowledge of the local rental market and can help you price your unit competitively.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Thorough Tenant Screening</h3>
                      <p className="text-muted-foreground text-sm">
                        We verify employment, conduct credit checks, and review references to find reliable tenants.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Legal Compliance</h3>
                      <p className="text-muted-foreground text-sm">
                        We ensure all lease agreements comply with the Residential Tenancies Act and local regulations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Maximum Exposure</h3>
                      <p className="text-muted-foreground text-sm">
                        Your property will be listed on MLS and other platforms for maximum visibility.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Professional Negotiation</h3>
                      <p className="text-muted-foreground text-sm">
                        We negotiate on your behalf to secure the best possible terms for your rental.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Ongoing Support</h3>
                      <p className="text-muted-foreground text-sm">
                        We provide guidance throughout the entire leasing process and beyond.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Lease Your Property?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let us help you find the perfect tenant and maximize your rental income.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LeasingServices;
