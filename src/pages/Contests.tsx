import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Calendar, Gift, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Contest {
  id: string;
  title: string;
  description: string;
  prize: string;
  deadline: string;
  status: "active" | "upcoming" | "ended";
}

const Contests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      const { data, error } = await supabase
        .from("contests" as any)
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setContests(data as unknown as Contest[]);
      }
      setLoading(false);
    };
    fetchContests();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-6 md:py-8">
            <div className="container text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Promotions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Participate in our exciting promotions for a chance to win amazing prizes. Check back regularly for new opportunities!
            </p>
          </div>
        </section>

        {/* Contests */}
        <section className="py-3">
          <div className="container max-w-4xl">
            <h2 className="mb-8 text-2xl font-bold text-foreground text-center">Current Promotions</h2>
            {loading ? (
              <p className="text-muted-foreground">Loading contests...</p>
            ) : contests.length === 0 ? (
              <p className="text-muted-foreground">No promotions available right now. Check back soon!</p>
            ) : (
              <div className="space-y-6">
                {contests.map((contest) => (
                  <Card key={contest.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              contest.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : contest.status === "upcoming"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {contest.status === "active" ? "Active" : contest.status === "upcoming" ? "Upcoming" : "Ended"}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">{contest.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{contest.description}</p>
                          <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                              <Gift className="h-4 w-4" />
                              {contest.prize}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {contest.deadline}
                            </span>
                          </div>
                        </div>
                        {contest.status === "active" && (
                          <Link to="/contact">
                            <Button size="sm" className="shrink-0">Enter Now</Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted py-16">
          <div className="container max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">How It Works</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: Users, title: "Stay Connected", desc: "Create an account or subscribe to our newsletter to receive exclusive promotions." },
                { icon: Star, title: "Take Advantage", desc: "Browse current offers and follow the instructions to claim your deal before it expires." },
                { icon: Trophy, title: "Enjoy the Rewards", desc: "Redeem your promotion and enjoy savings on your real estate journey!" },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">Don't Miss Out!</h2>
            <p className="mt-3 text-muted-foreground">
              Subscribe to our newsletter to get notified about new promotions and giveaways.
            </p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button size="lg">Get Notified</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contests;
