import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, Award, GraduationCap, Globe, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addLead } from "@/stores/leadsStore";
import agentPhoto from "@/assets/agent-photo.png";
import srsLogo from "@/assets/srs-logo.jpg";
import reneLogo from "@/assets/rene-logo.png";
import resaLogo from "@/assets/resa-logo.png";
import awardHallOfFame from "@/assets/award-hall-of-fame.png";
import awardPlatinumClub from "@/assets/award-platinum-club.png";
import award100Club from "@/assets/award-100-club.png";
import awardExecutiveClub from "@/assets/award-executive-club.png";

const About = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "Hi Sanjeev Manocha. I have come across your profile and I am interested in your services as a Broker of Record.",
  });
  const [userTypes, setUserTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeToggle = (type: string) => {
    setUserTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      if (prev.length < 2) {
        return [...prev, type];
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms before submitting.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        userType: userTypes.join(", "),
        source: "About Page Contact Form",
      });
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "Hi Sanjeev Manocha. I have come across your profile and I am interested in your services as a Broker of Record.",
      });
      setUserTypes([]);
      setConsentChecked(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const awards = [
    { name: "ReMax Hall of Fame", image: awardHallOfFame },
    { name: "ReMax Platinum Club", image: awardPlatinumClub },
    { name: "ReMax 100% Club", image: award100Club },
    { name: "ReMax Executive Club", image: awardExecutiveClub },
  ];

  const certifications = [
    "Certified Real Estate Negotiation Expert (RENE)",
    "Certified Real Estate Staging Advocate (RESA)",
    "Seller Representative Specialist (SRS)",
  ];

  const specialties = ["Residential", "Commercial", "Rent", "Invest"];

  const areasServed = [
    "Greater Toronto Area",
    "Etobicoke",
    "Mississauga",
    "Brampton",
    "Oakville",
    "Milton",
    "Hamilton",
    "Burlington",
    "Scarborough",
    "Ajax",
    "Oshawa",
    "Whitby",
    "Pickering",
    "Vaughan",
    "Woodbridge",
    "Kleinburg",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                About Sanjeev Manocha
              </h1>
              <p className="mt-2 text-xl text-primary font-medium">
                Founder & Broker of Record, MyRealco Inc., Brokerage
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                I am a certified Real Estate Negotiation Expert (RENE) and Seller Representative 
                Specialist (SRS). I help GTA buyers, sellers, and investors make confident real 
                estate decisions—with strategy, transparency, and strong negotiation.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                A Licensed Full Time Real Estate professional with 15+ years of experience, 
                I have a demonstrated history of helping hundreds of sellers and buyers across the 
                Greater Toronto Area—Toronto, Etobicoke, Mississauga, Brampton, Oakville, Woodbridge, 
                Vaughan, Oshawa, Pickering, Ajax, Whitby, Hamilton, Stoney Creek, Markham, New Market, 
                North York and more.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="tel:416-843-7600"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" />
                  416-843-7600
                </a>
                <a
                  href="mailto:smanocha@myrealco.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src={agentPhoto}
                alt="Sanjeev Manocha"
                className="h-80 w-80 rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Languages */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center">
              <Clock className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-display text-3xl font-bold text-foreground">
                19+
              </h3>
              <p className="text-muted-foreground">Years of Experience</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                Languages
              </h3>
              <p className="text-muted-foreground">English, Hindi, Punjabi, Urdu</p>
            </Card>
            <Card className="p-6 text-center">
              <MapPin className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                Based In
              </h3>
              <p className="text-muted-foreground">Toronto, Ontario</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-accent" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Awards & Recognition
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {awards.map((award) => (
                  <div
                    key={award.name}
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      src={award.image}
                      alt={award.name}
                      className="h-40 w-40 object-contain mb-2"
                    />
                    {false && (
                      <span className="text-xs text-muted-foreground font-medium">
                        {award.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Education & Certifications
                </h2>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img src={reneLogo} alt="Real Estate Negotiation Expert (RENE)" className="h-20 w-auto" />
                <img src={resaLogo} alt="Real Estate Staging Association (RESA)" className="h-20 w-auto" />
                <img src={srsLogo} alt="Seller Representative Specialist (SRS)" className="h-20 w-auto" />
              </div>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="text-muted-foreground flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Specialties
          </h2>
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <Badge
                key={specialty}
                className="bg-primary text-primary-foreground px-4 py-2 text-base"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Areas We Serve
          </h2>
          <div className="flex flex-wrap gap-3">
            {areasServed.map((area) => (
              <Badge
                key={area}
                variant="outline"
                className="border-primary/30 text-foreground px-4 py-2 text-base"
              >
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-12 bg-background">
        <div className="container">
          <Card className="p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              About MyRealCo Inc.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              MyRealCo Inc., Brokerage is a proudly 100% canadian independent 
              real estate brokerage serving the Greater Toronto Area.
              <br />
              <br />
              Founded by Sanjeev Manocha, Broker of Record, MyRealCo was created
              after more than two decades of experience in the real estate 
              industry, including many successful years with RE/MAX. The vision
              behind launching the brokerage was to build a modern, client-centric 
              real estate company that focuses on transparency, strong relationships,
              and innovative marketing.
              <br />
              <br />
              The GTA real estate market continues to evolve, with buyers and 
              sellers becoming more informed and technology-driven. MyRealCo was 
              built to adapt to this reality — combining traditional real estate 
              expertise with modern digital tools and data-driven insights.
              <br />
              <br />
              The brokerage provides services in:
              <br />
              Residential buying and selling 
              <br />
              Real estate investments
              <br />
              Commercial leasing and transactions 
              <br />
              Strategic real estate advisory
              <br />
              <br />
              Our Philosophy is simple:
              <br />
              Real estate is not just about transactions - it is about trust,
              relationships, and long-term value.
              <br />
              <br />
              MyRealco is also committed to building a collaborative environment 
              for real estate professionals who want to grow their careers within 
              a supportive and entrepreneurial brokerage.
              <br />
              <br />
              As we contitue to grow, our mission reamins clear:
              to provide honest advice, outstanding service, and real results 
              for our clients.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-primary text-center mb-10 underline underline-offset-8 decoration-2">
            CONTACT ME
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left column - Input fields */}
              <div className="space-y-4">
                <Input
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-muted-foreground/30"
                />
                <Input
                  name="phone"
                  placeholder="Phone *"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-muted-foreground/30"
                />
                <Input
                  name="email"
                  placeholder="Email *"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-muted-foreground/30"
                />
              </div>
              
              {/* Right column - Textarea */}
              <div>
                <Textarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[180px] border-muted-foreground/30 resize-y"
                  required
                />
              </div>
            </div>

            {/* User Type Selection */}
            <div className="text-center">
              <p className="text-foreground mb-4">
                I am a:<span className="text-destructive">*</span>{" "}
                <span className="text-muted-foreground text-sm">(select up to 2 categories)</span>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["buyer", "seller", "renter", "other"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleUserTypeToggle(type)}
                    className={`px-8 py-3 border rounded transition-colors capitalize ${
                      userTypes.includes(type)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-muted-foreground/30 text-foreground hover:border-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Checkbox
                id="consent"
                checked={consentChecked}
                onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="consent" className="cursor-pointer leading-relaxed">
                By submitting this form, I agree to be contacted by MyRealCo Inc. via email, phone, and text about real estate services. 
                Message and data rates may apply. Message frequency may vary. Consent is not a condition of purchase. 
                Reply STOP to unsubscribe from calls and texts. To stop receiving emails, click Unsubscribe in any email. 
                See our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a> for more information.
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting || userTypes.length === 0}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-16 py-6 text-lg font-semibold"
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-center">
              <a href="#" className="text-primary hover:underline text-sm">
                Disclaimer
              </a>
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
