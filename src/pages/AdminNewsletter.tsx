import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, RefreshCw, Users, Download } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("newsletter_subscribers" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSubscribers(data as unknown as Subscriber[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(dateStr));

  const exportCSV = () => {
    const csv = ["Email,Subscribed Date", ...subscribers.map((s) => `${s.email},${s.created_at}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
              </Link>
            </Button>
            <h1 className="font-display text-xl font-semibold text-foreground">
              Newsletter Subscribers
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={exportCSV} variant="outline" size="sm" disabled={subscribers.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={fetchSubscribers} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <p className="text-3xl font-bold text-foreground">{subscribers.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {subscribers.filter((s) => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(s.created_at) > weekAgo;
                }).length}
              </p>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {subscribers.filter((s) => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(s.created_at) > monthAgo;
                }).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="font-display text-xl">All Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-muted-foreground">Loading...</div>
            ) : subscribers.length === 0 ? (
              <div className="py-12 text-center">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg text-muted-foreground">
                  No subscribers yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscribed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((sub, i) => (
                      <TableRow key={sub.id}>
                        <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 font-medium text-foreground">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {sub.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="whitespace-nowrap">
                            {formatDate(sub.created_at)}
                          </Badge>
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
    </div>
  );
};

export default AdminNewsletter;
