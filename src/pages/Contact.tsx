import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, CheckCircle, MessageSquare } from "lucide-react";
import { addLead } from "@/stores/leadsStore";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userType, setUserType] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    contactMethod: "email",
    message: "",
  });

  const userTypes = ["Buyer", "Seller", "Renter", "Other"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (type: string) => {
    if (userType.includes(type)) {
      setUserType(userType.filter(t => t !== type));
    } else if (userType.length < 2) {
      setUserType([...userType, type]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await addLead({
      propertyId: "contact-form",
      propertyTitle: "General Contact Inquiry",
      name: `${formData.name} ${formData.lastName}`,
      email: formData.email,
      message: `User Type: ${userType.join(", ")}
Preferred Contact: ${formData.contactMethod}
Phone: ${formData.phone}
Message: ${formData.message}`,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Contact Us
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Have questions? We're here to help!
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info Cards */}
              <div className="space-y-4 lg:col-span-1">
                <Card className="card-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">Call Us</h3>
                      <a href="tel:416-843-7600" className="text-muted-foreground hover:text-primary">
                        (416) 843-7600
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">Email Us</h3>
                      <a href="mailto:info@myrealco.com" className="text-muted-foreground hover:text-primary">
                        info@myrealco.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">Visit Us</h3>
                      <p className="text-muted-foreground">
                        Toronto, Ontario
                      </p>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Contact Form */}
              <Card className="card-shadow lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Send a Message</CardTitle>
                      <CardDescription>Fill out the form and we'll get back to you</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">First Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(416) 555-0123"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Contact Method</Label>
                        <RadioGroup
                          value={formData.contactMethod}
                          onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="contact-email" />
                            <Label htmlFor="contact-email" className="cursor-pointer">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="contact-phone" />
                            <Label htmlFor="contact-phone" className="cursor-pointer">Phone</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>I am a: (select up to 2) *</Label>
                        <div className="flex flex-wrap gap-2">
                          {userTypes.map((type) => (
                            <div
                              key={type}
                              className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
                                userType.includes(type)
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary"
                              }`}
                              onClick={() => handleUserTypeChange(type)}
                            >
                              {userType.includes(type) && <CheckCircle className="h-4 w-4" />}
                              <span className="text-sm font-medium">{type}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || userType.length === 0}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        By submitting this form, I agree to be contacted by MyRealco Inc. via email, phone, and text about real estate services.
                      </p>
                    </form>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="mb-2 font-display text-xl font-semibold">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. Sanjeev will personally respond to your inquiry within 24 hours.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
