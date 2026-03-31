import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, Phone, Calendar, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface JobApplication {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  resume_path: string | null;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from("job_applications" as any)
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setApplications(data as unknown as JobApplication[]);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const handleDownloadResume = async (path: string, applicantName: string) => {
    const { data, error } = await supabase.storage
      .from("resumes")
      .download(path);

    if (error || !data) return;

    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${applicantName.replace(/\s+/g, "-")}-resume.${path.split(".").pop()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-10">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-8">Job Applications</h1>

        {loading ? (
          <p className="text-muted-foreground">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-muted-foreground">No applications yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(app.created_at).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-3 text-sm">
                    <a href={`mailto:${app.email}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <Mail className="h-4 w-4" />
                      {app.email}
                    </a>
                    {app.phone && (
                      <a href={`tel:${app.phone}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                        <Phone className="h-4 w-4" />
                        {app.phone}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{app.message}</p>
                  {app.resume_path && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleDownloadResume(app.resume_path!, app.name)}
                    >
                      <Download className="h-4 w-4" />
                      Download Resume
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminApplications;
