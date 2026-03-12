import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { toast } from "sonner";

interface FoodListing {
  id: number;
  name: string;
  category: string;
  quantity: number;
  deadline: string;
  location: string;
  notes: string;
  status: "Available" | "Assigned" | "Picked Up";
}

const initialListings: FoodListing[] = [
  { id: 1, name: "Biryani", category: "Rice", quantity: 50, deadline: "8:00 PM", location: "Grand Hotel, MG Road", notes: "", status: "Available" },
  { id: 2, name: "Chapati & Dal", category: "Bread", quantity: 30, deadline: "9:00 PM", location: "Royal Restaurant", notes: "Freshly prepared", status: "Assigned" },
  { id: 3, name: "Packed Meals", category: "Packed Food", quantity: 100, deadline: "7:30 PM", location: "Wedding Hall, Ring Road", notes: "", status: "Picked Up" },
];

const DonorDashboard = () => {
  const [listings, setListings] = useState<FoodListing[]>(initialListings);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", quantity: "", deadline: "", location: "", notes: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: FoodListing = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      quantity: parseInt(form.quantity),
      deadline: form.deadline,
      location: form.location,
      notes: form.notes,
      status: "Available",
    };
    setListings(prev => [newListing, ...prev]);
    setForm({ name: "", category: "", quantity: "", deadline: "", location: "", notes: "" });
    setShowForm(false);
    toast.success("Food listing added successfully!");
  };

  return (
    <DashboardLayout role="donor">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Food Listings</h1>
          <p className="text-sm text-muted-foreground">Manage your surplus food donations</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="h-11 gap-2">
          <Plus className="h-4 w-4" /> Add Food Listing
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Available", count: listings.filter(l => l.status === "Available").length, color: "text-status-available" },
          { label: "Assigned", count: listings.filter(l => l.status === "Assigned").length, color: "text-status-assigned" },
          { label: "Picked Up", count: listings.filter(l => l.status === "Picked Up").length, color: "text-status-completed" },
        ].map(s => (
          <div key={s.label} className="rounded-xl bg-card p-5" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}>
            <div className="text-sm font-medium text-muted-foreground">{s.label}</div>
            <div className={`mt-1 text-2xl font-bold tabular-nums ${s.color}`}>{s.count}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-card" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Food</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Qty</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Deadline</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Location</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item, i) => (
                <motion.tr
                  key={item.id}
                  className="border-b last:border-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="px-4 py-4 font-medium text-foreground">{item.name}</td>
                  <td className="px-4 py-4 text-muted-foreground">{item.category}</td>
                  <td className="px-4 py-4 tabular-nums text-foreground">{item.quantity} meals</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {item.deadline}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {item.location}
                    </span>
                  </td>
                  <td className="px-4 py-4"><StatusBadge status={item.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Food Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg rounded-2xl bg-card p-8"
              style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,.25)" }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Add Food Listing</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label>Food Name</Label>
                  <Input className="mt-1.5 h-11" placeholder="e.g., Biryani" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                    <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {["Rice", "Curry", "Bread", "Packed Food", "Snacks", "Beverages", "Other"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Quantity (meals)</Label>
                    <Input className="mt-1.5 h-11" type="number" placeholder="50" value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Pickup Deadline</Label>
                    <Input className="mt-1.5 h-11" type="time" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} required />
                  </div>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input className="mt-1.5 h-11" placeholder="Address" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} required />
                </div>
                <div>
                  <Label>Notes (optional)</Label>
                  <Textarea className="mt-1.5" placeholder="Any special instructions..." value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
                </div>
                <Button type="submit" className="h-11 w-full text-base">Add Listing</Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default DonorDashboard;
