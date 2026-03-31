import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Award, Handshake, CheckCircle, Send, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const benefits = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Access mentorship, training programs, and a clear path to advance your real estate career.",
  },
  {
    icon: Award,
    title: "Award-Winning Team",
    description: "Join a recognized brokerage with Platinum Club, Hall of Fame, and Executive Club achievements.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work alongside experienced professionals who share knowledge and support each other's success.",
  },
  {
    icon: Handshake,
    title: "Client-First Approach",
    description: "Be part of a team that prioritizes integrity, trust, and exceptional client experiences.",
  },
];

const openRoles = [
  {
    title: "Licensed Real Estate Agent",
    type: "Full-time",
    description: "Looking for motivated, licensed agents to join our growing team serving the Greater Toronto Area.",
  },
  {
    title: "Real Estate Sales Representative",
    type: "Full-time",
    description: "Help clients buy and sell homes while building your personal brand within our supportive brokerage.",
  },
  {
    title: "Marketing Coordinator",
    type: "Part-time",
    description: "Support our team with listing photography, social media management, and marketing campaigns.",
  },
];

const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const JoinUs = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }
    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let resumePath: string | null = null;

      if (resumeFile) {
        const fileExt = resumeFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, resumeFile);

        if (uploadError) throw uploadError;
        resumePath = fileName;
      }

      const { error } = await supabase.from("job_applications" as any).insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim(),
        resume_path: resumePath,
      } as any);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Join Our Team
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Build your real estate career with a team that values growth, collaboration, and client excellence in the Greater Toronto Area.
            </p>
            <a href="#apply" className="mt-8 inline-block">
              <Button size="lg" className="gap-2">
                <Send className="h-4 w-4" />
                Apply Now
              </Button>
            </a>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
              Why Join MyRealCo?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <Card key={i} className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <benefit.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="bg-muted py-16">
          <div className="container max-w-3xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
              Open Positions
            </h2>
            <div className="space-y-4">
              {openRoles.map((role, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardContent className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {role.type}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Look For */}
        <section className="py-16">
          <div className="container max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
              What We Look For
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Valid Ontario real estate license (RECO registered)",
                "Strong communication and negotiation skills",
                "Self-motivated with an entrepreneurial mindset",
                "Passion for helping clients achieve their goals",
                "Knowledge of the GTA real estate market",
                "Commitment to ethical and professional standards",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="bg-muted py-16">
          <div className="container max-w-xl">
            <h2 className="mb-2 text-center text-3xl font-bold text-foreground">
              Apply Today
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Interested in joining our team? Fill out the form below and we'll get back to you.
            </p>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Tell us about yourself</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your experience, goals, and why you'd like to join our team..."
                      required
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <Label>Resume (PDF, DOC, DOCX — max 10MB)</Label>
                    {resumeFile ? (
                      <div className="mt-2 flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
                        <FileText className="h-5 w-5 shrink-0 text-primary" />
                        <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                          {resumeFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Upload className="h-5 w-5" />
                        Click to upload your resume
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ACCEPTED_FILE_TYPES}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={submitting}>
                    <Send className="h-4 w-4" />
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JoinUs;
