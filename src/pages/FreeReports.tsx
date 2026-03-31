import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, CheckCircle, BookOpen, Users, Home, TrendingUp } from "lucide-react";
import { addLead } from "@/stores/leadsStore";

const FreeReports = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [userType, setUserType] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const reports = [
    { id: "home-buying-secrets", title: "10 Helpful Home Buying Secrets", icon: Home },
    { id: "hiring-realtor", title: "10 Questions To Ask When Hiring a Realtor", icon: Users },
    { id: "selling-mistakes", title: "8 Common Home Selling Mistakes", icon: TrendingUp },
    { id: "fsbo-guide", title: "Considering For Sale By Owner Guide", icon: FileText },
    { id: "finding-right-home", title: "Guide To Finding The Right Home", icon: BookOpen },
    { id: "get-more-for-home", title: "How To Get More For Your Home", icon: TrendingUp },
    { id: "renting-vs-buying", title: "Renting vs. Buying", icon: Home },
    { id: "renovations-guide", title: "Return on Renovations Guide", icon: TrendingUp },
    { id: "easier-move", title: "Tips For An Easier Move", icon: BookOpen },
    { id: "reasons-to-move", title: "Top 10 Reasons To Move", icon: Home },
  ];

  const userTypes = ["Buyer", "Seller", "Renter", "Other"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReportChange = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId]);
    } else {
      setSelectedReports(selectedReports.filter(r => r !== reportId));
    }
  };

  const handleUserTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      if (userType.length < 2) {
        setUserType([...userType, type]);
      }
    } else {
      setUserType(userType.filter(t => t !== type));
    }
  };

  const selectAllReports = () => {
    setSelectedReports(reports.map(r => r.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedReportTitles = reports
      .filter(r => selectedReports.includes(r.id))
      .map(r => r.title)
      .join(", ");

    await addLead({
      propertyId: "free-reports",
      propertyTitle: "Free Reports Request",
      name: `${formData.name} ${formData.lastName}`,
      email: formData.email,
      message: `Reports Requested: ${selectedReportTitles}
User Type: ${userType.join(", ")}
Phone: ${formData.phone}`,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Reports Sent!",
      description: "Check your email for your free reports.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12">
        <div className="container max-w-4xl">
          <Card className="card-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-display text-2xl md:text-3xl">
                Free Real Estate Reports
              </CardTitle>
              <CardDescription className="mx-auto max-w-xl text-base">
                Get exclusive buyer & seller real estate reports to help you with your next purchase or sale.
                Learn insider tips and tricks, and make informed decisions in the real estate market.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold">Contact Information</h3>
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
                  </div>

                  {/* Report Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold">Select Reports *</h3>
                      <Button type="button" variant="link" onClick={selectAllReports} className="text-primary">
                        Select All
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {reports.map((report) => {
                        const Icon = report.icon;
                        return (
                          <div key={report.id} className="flex items-start space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                            <Checkbox
                              id={report.id}
                              checked={selectedReports.includes(report.id)}
                              onCheckedChange={(checked) => handleReportChange(report.id, checked as boolean)}
                            />
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-primary" />
                              <label htmlFor={report.id} className="cursor-pointer text-sm font-medium leading-tight">
                                {report.title}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* User Type */}
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold">I am a: (select up to 2) *</h3>
                    <div className="flex flex-wrap gap-3">
                      {userTypes.map((type) => (
                        <div
                          key={type}
                          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
                            userType.includes(type)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary"
                          }`}
                          onClick={() => handleUserTypeChange(type, !userType.includes(type))}
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
                    disabled={isSubmitting || selectedReports.length === 0 || userType.length === 0}
                  >
                    {isSubmitting ? "Sending..." : "Get Free Reports"}
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
                  <h3 className="mb-2 font-display text-xl font-semibold">Reports Sent!</h3>
                  <p className="text-muted-foreground">
                    Check your email at <strong>{formData.email}</strong> for your free reports.
                    If you don't see them, please check your spam folder.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeReports;
