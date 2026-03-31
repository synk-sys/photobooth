import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getLeads, Lead } from "@/stores/leadsStore";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, User, MessageSquare, Home, RefreshCw, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const refreshLeads = async () => {
    setLoading(true);
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => { refreshLeads(); }, []);

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Property", "User Type", "Source", "Message", "Date"];
    const rows = leads.map((l) => [
      l.name,
      l.email,
      l.phone || "",
      l.property_title || l.property_id || "",
      l.user_type || "",
      l.source || "",
      (l.message || "").replace(/"/g, '""'),
      formatDate(l.created_at),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    const { error } = await supabase.from("leads" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete lead.", variant: "destructive" });
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast({ title: "Deleted", description: "Lead has been removed." });
    }
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
    }).format(new Date(dateStr));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-10">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
          <div className="flex items-center gap-2">
            <Button onClick={handleExportCSV} variant="outline" size="sm" disabled={leads.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={refreshLeads} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{leads.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {leads.filter((l) => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(l.created_at) > weekAgo;
                }).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Properties Inquired</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {new Set(leads.filter(l => l.property_id).map((l) => l.property_id)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="py-8 text-center text-muted-foreground">Loading leads...</p>
            ) : leads.length === 0 ? (
              <div className="py-12 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg text-muted-foreground">
                  No leads yet. Submit a request on a property page to see leads here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 font-medium text-foreground">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {lead.name}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              {lead.email}
                            </div>
                            {lead.phone && (
                              <div className="text-sm text-muted-foreground">{lead.phone}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {lead.property_id ? (
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-muted-foreground" />
                              <Link to={`/property/${lead.property_id}`} className="text-primary hover:underline">
                                {lead.property_title || lead.property_id}
                              </Link>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="max-w-xs truncate text-muted-foreground">{lead.message}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="whitespace-nowrap">
                            {formatDate(lead.created_at)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(lead.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLeads;
