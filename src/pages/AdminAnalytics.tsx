import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, RefreshCw, Eye, Users, TrendingUp, Globe, Smartphone, Monitor, Tablet, MapPin, Clock, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageView {
  id: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
  session_id: string | null;
  created_at: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  CA: "Canada", US: "United States", GB: "United Kingdom", AU: "Australia", IN: "India",
  DE: "Germany", FR: "France", CN: "China", JP: "Japan", BR: "Brazil", MX: "Mexico",
  IT: "Italy", ES: "Spain", KR: "South Korea", NL: "Netherlands", SE: "Sweden",
  NO: "Norway", DK: "Denmark", FI: "Finland", PL: "Poland", RU: "Russia",
  ZA: "South Africa", NG: "Nigeria", EG: "Egypt", AE: "UAE", SA: "Saudi Arabia",
  SG: "Singapore", HK: "Hong Kong", PH: "Philippines", MY: "Malaysia", TH: "Thailand",
  ID: "Indonesia", NZ: "New Zealand", IE: "Ireland", PT: "Portugal", CH: "Switzerland",
  AT: "Austria", BE: "Belgium", CZ: "Czech Republic", RO: "Romania", IL: "Israel",
};

const getDeviceType = (ua: string | null): string => {
  if (!ua) return "Unknown";
  const lower = ua.toLowerCase();
  if (/tablet|ipad|playbook|silk/.test(lower)) return "Tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/.test(lower)) return "Mobile";
  return "Desktop";
};

const DEVICE_COLORS = ["hsl(var(--primary))", "hsl(var(--accent-foreground))", "hsl(var(--muted-foreground))"];

const AdminAnalytics = () => {
  const [views, setViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchData = async () => {
    setLoading(true);
    const since = new Date();
    since.setDate(since.getDate() - days);

    const { data, error } = await supabase
      .from("page_views" as any)
      .select("*")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: true });

    if (!error && data) setViews(data as unknown as PageView[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [days]);

  const exportToCSV = () => {
    if (views.length === 0) return;
    
    const headers = ["Date", "Path", "Referrer", "Device", "Country", "Session ID"];
    const csvRows = views.map(v => {
      const date = new Date(v.created_at).toISOString();
      const path = v.path;
      const referrer = v.referrer || "Direct";
      const device = getDeviceType(v.user_agent);
      const country = v.country ? (COUNTRY_NAMES[v.country] || v.country) : "Unknown";
      const sessionId = v.session_id || "Unknown";
      
      return `"${date}","${path}","${referrer}","${device}","${country}","${sessionId}"`;
    });
    
    const blob = new Blob([[headers.join(","), ...csvRows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `analytics_${days}days_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const stats = useMemo(() => {
    const uniqueSessions = new Set(views.map(v => v.session_id)).size;
    const today = new Date().toDateString();
    const todayViews = views.filter(v => new Date(v.created_at).toDateString() === today).length;

    // Build per-session timestamps for bounce rate + avg session duration
    const sessionTimestamps = new Map<string, { min: number; max: number; count: number }>();
    views.forEach(v => {
      if (v.session_id) {
        const ts = new Date(v.created_at).getTime();
        const existing = sessionTimestamps.get(v.session_id);
        if (!existing) {
          sessionTimestamps.set(v.session_id, { min: ts, max: ts, count: 1 });
        } else {
          sessionTimestamps.set(v.session_id, {
            min: Math.min(existing.min, ts),
            max: Math.max(existing.max, ts),
            count: existing.count + 1,
          });
        }
      }
    });

    // Bounce rate: sessions with only 1 page view
    const totalSessions = sessionTimestamps.size;
    const bouncedSessions = Array.from(sessionTimestamps.values()).filter(s => s.count === 1).length;
    const bounceRate = totalSessions > 0 ? Math.round((bouncedSessions / totalSessions) * 100) : 0;

    // Avg session duration (exclude single-page / bounce sessions from duration calc)
    const multiPageSessions = Array.from(sessionTimestamps.values()).filter(s => s.count > 1);
    const avgSessionDurationMs = multiPageSessions.length > 0
      ? multiPageSessions.reduce((sum, s) => sum + (s.max - s.min), 0) / multiPageSessions.length
      : 0;
    const avgSessionDurationSec = Math.round(avgSessionDurationMs / 1000);
    const formatDuration = (sec: number) => {
      if (sec < 60) return `${sec}s`;
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return s > 0 ? `${m}m ${s}s` : `${m}m`;
    };

    // Views per day for chart
    const dailyMap = new Map<string, { views: number; sessions: Set<string> }>();
    views.forEach(v => {
      const day = new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!dailyMap.has(day)) dailyMap.set(day, { views: 0, sessions: new Set() });
      const entry = dailyMap.get(day)!;
      entry.views++;
      if (v.session_id) entry.sessions.add(v.session_id);
    });
    const dailyData = Array.from(dailyMap.entries()).map(([date, d]) => ({
      date,
      views: d.views,
      visitors: d.sessions.size,
    }));

    // Top pages
    const pageMap = new Map<string, number>();
    views.forEach(v => pageMap.set(v.path, (pageMap.get(v.path) || 0) + 1));
    const topPages = Array.from(pageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    // Top referrers
    const refMap = new Map<string, number>();
    views.forEach(v => {
      if (v.referrer) {
        try {
          const host = new URL(v.referrer).hostname || v.referrer;
          refMap.set(host, (refMap.get(host) || 0) + 1);
        } catch {
          refMap.set(v.referrer, (refMap.get(v.referrer) || 0) + 1);
        }
      }
    });
    const topReferrers = Array.from(refMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, count]) => ({ source, count }));

    // Device breakdown
    const deviceMap = new Map<string, number>();
    views.forEach(v => {
      const device = getDeviceType(v.user_agent);
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    });
    const deviceData = Array.from(deviceMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value, percent: Math.round((value / views.length) * 100) }));

    // Country breakdown
    const countryMap = new Map<string, number>();
    views.forEach(v => {
      const code = v.country || "Unknown";
      countryMap.set(code, (countryMap.get(code) || 0) + 1);
    });
    const countryData = Array.from(countryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([code, count]) => ({
        code,
        name: code === "Unknown" ? "Unknown" : (COUNTRY_NAMES[code] || code),
        count,
        percent: views.length ? Math.round((count / views.length) * 100) : 0,
      }));

    return { totalViews: views.length, uniqueSessions, todayViews, bounceRate, avgSessionDuration: formatDuration(avgSessionDurationSec), dailyData, topPages, topReferrers, deviceData, countryData };
  }, [views]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-10">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-foreground">Site Analytics</h1>
          <div className="flex items-center gap-2">
            {[7, 30, 90].map(d => (
              <Button key={d} variant={days === d ? "default" : "outline"} size="sm" onClick={() => setDays(d)}>
                {d}d
              </Button>
            ))}
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={exportToCSV} variant="outline" size="sm" disabled={views.length === 0 || loading}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-12 text-muted-foreground">Loading analytics...</p>
        ) : (
          <>
            {/* Summary cards */}
            <div className="mb-8 grid gap-4 md:grid-cols-5">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Eye className="h-4 w-4" /> Total Page Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" /> Unique Visitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stats.uniqueSessions.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stats.todayViews}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Bounce Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stats.bounceRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Single-page sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Avg Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stats.avgSessionDuration}</p>
                  <p className="text-xs text-muted-foreground mt-1">Multi-page sessions</p>
                </CardContent>
              </Card>
            </div>

            {/* Traffic chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Traffic Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.dailyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} name="Page Views" />
                      <Line type="monotone" dataKey="visitors" stroke="hsl(var(--accent-foreground))" strokeWidth={2} name="Visitors" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Device breakdown */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" /> Device Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.deviceData.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No data yet</p>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="h-[250px] w-full md:w-1/2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.deviceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${percent}%`}
                          >
                            {stats.deviceData.map((_, index) => (
                              <Cell key={index} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 w-full md:w-1/2">
                      {stats.deviceData.map((device, i) => (
                        <div key={device.name} className="flex items-center gap-3">
                          <div className="flex items-center gap-2 min-w-[100px]">
                            {device.name === "Mobile" && <Smartphone className="h-5 w-5 text-muted-foreground" />}
                            {device.name === "Desktop" && <Monitor className="h-5 w-5 text-muted-foreground" />}
                            {device.name === "Tablet" && <Tablet className="h-5 w-5 text-muted-foreground" />}
                            <span className="text-sm font-medium text-foreground">{device.name}</span>
                          </div>
                          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${device.percent}%`, backgroundColor: DEVICE_COLORS[i % DEVICE_COLORS.length] }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                            {device.value} ({device.percent}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Geographic breakdown */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Visitors by Country
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.countryData.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No geographic data yet</p>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.countryData} layout="vertical" margin={{ left: 100 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={95} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                          formatter={(value: number, _: string, props: any) => [`${value} (${props.payload.percent}%)`, 'Views']}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Top pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.topPages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {stats.topPages.map((page, i) => (
                        <div key={page.path} className="flex items-center justify-between">
                          <span className="text-sm text-foreground truncate max-w-[70%]">
                            <span className="text-muted-foreground mr-2">{i + 1}.</span>
                            {page.path}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">{page.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Top referrers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Referrers</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.topReferrers.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No referrer data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {stats.topReferrers.map((ref, i) => (
                        <div key={ref.source} className="flex items-center justify-between">
                          <span className="text-sm text-foreground truncate max-w-[70%]">
                            <span className="text-muted-foreground mr-2">{i + 1}.</span>
                            {ref.source}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">{ref.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminAnalytics;
