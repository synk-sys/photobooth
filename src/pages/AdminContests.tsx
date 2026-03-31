import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Pencil, Trash2, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Contest {
  id: string;
  created_at: string;
  title: string;
  description: string;
  prize: string;
  deadline: string;
  status: string;
  is_visible: boolean;
}

const emptyForm = { title: "", description: "", prize: "", deadline: "", status: "active", is_visible: true };

const AdminContests = () => {
  const { toast } = useToast();
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Contest | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchContests = async () => {
    const { data, error } = await supabase
      .from("contests" as any)
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setContests(data as unknown as Contest[]);
    setLoading(false);
  };

  useEffect(() => { fetchContests(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (c: Contest) => {
    setEditing(c);
    setForm({ title: c.title, description: c.description, prize: c.prize, deadline: c.deadline, status: c.status, is_visible: c.is_visible });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) return;

    if (editing) {
      const { error } = await supabase
        .from("contests" as any)
        .update({ title: form.title, description: form.description, prize: form.prize, deadline: form.deadline, status: form.status, is_visible: form.is_visible } as any)
        .eq("id", editing.id);
      if (error) { toast({ title: "Error", description: "Failed to update contest.", variant: "destructive" }); return; }
      toast({ title: "Updated", description: "Contest updated successfully." });
    } else {
      const { error } = await supabase
        .from("contests" as any)
        .insert({ title: form.title, description: form.description, prize: form.prize, deadline: form.deadline, status: form.status, is_visible: form.is_visible } as any);
      if (error) { toast({ title: "Error", description: "Failed to create contest.", variant: "destructive" }); return; }
      toast({ title: "Created", description: "Contest created successfully." });
    }
    setDialogOpen(false);
    fetchContests();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("contests" as any).delete().eq("id", id);
    if (error) { toast({ title: "Error", description: "Failed to delete contest.", variant: "destructive" }); return; }
    toast({ title: "Deleted", description: "Contest deleted." });
    fetchContests();
  };

  const toggleVisibility = async (c: Contest) => {
    await supabase.from("contests" as any).update({ is_visible: !c.is_visible } as any).eq("id", c.id);
    fetchContests();
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
          <h1 className="text-3xl font-bold text-foreground">Manage Contests</h1>
          <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" />New Contest</Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : contests.length === 0 ? (
          <p className="text-muted-foreground">No contests yet. Create one!</p>
        ) : (
          <div className="space-y-4">
            {contests.map((c) => (
              <Card key={c.id} className={!c.is_visible ? "opacity-60" : ""}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{c.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        c.status === "active" ? "bg-green-100 text-green-800" : c.status === "upcoming" ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground"
                      }`}>{c.status}</span>
                      {!c.is_visible && <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Hidden</span>}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{c.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Prize: {c.prize} · Deadline: {c.deadline}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => toggleVisibility(c)} title={c.is_visible ? "Hide" : "Show"}>
                      <Trophy className={`h-4 w-4 ${c.is_visible ? "text-primary" : "text-muted-foreground"}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Contest" : "New Contest"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prize">Prize</Label>
                <Input id="prize" value={form.prize} onChange={(e) => setForm({ ...form, prize: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 pb-1">
                <Switch checked={form.is_visible} onCheckedChange={(v) => setForm({ ...form, is_visible: v })} />
                <Label>Visible</Label>
              </div>
            </div>
            <Button className="w-full" onClick={handleSave}>{editing ? "Save Changes" : "Create Contest"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContests;
