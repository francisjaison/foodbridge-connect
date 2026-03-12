import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, UtensilsCrossed, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { toast } from "sonner";

interface FoodCard {
  id: number;
  name: string;
  category: string;
  quantity: number;
  donor: string;
  deadline: string;
  distance: string;
  location: string;
  status: "Available" | "Requested" | "Assigned" | "Completed";
}

const initialCards: FoodCard[] = [
  { id: 1, name: "Biryani & Rice", category: "Rice", quantity: 50, donor: "Grand Hotel", deadline: "8:00 PM", distance: "1.2 km", location: "MG Road", status: "Available" },
  { id: 2, name: "Mixed Curry & Roti", category: "Curry", quantity: 30, donor: "Royal Restaurant", deadline: "9:00 PM", distance: "2.5 km", location: "Ring Road", status: "Available" },
  { id: 3, name: "Packed Meals", category: "Packed Food", quantity: 100, donor: "Celebration Hall", deadline: "7:30 PM", distance: "0.8 km", location: "Main Street", status: "Available" },
  { id: 4, name: "Sweets & Snacks", category: "Snacks", quantity: 40, donor: "Sweet Palace", deadline: "6:00 PM", distance: "3.1 km", location: "Station Road", status: "Requested" },
  { id: 5, name: "Chapati & Dal", category: "Bread", quantity: 60, donor: "Dine Fine", deadline: "8:30 PM", distance: "1.8 km", location: "Park Avenue", status: "Assigned" },
];

const NgoDashboard = () => {
  const [cards, setCards] = useState<FoodCard[]>(initialCards);
  const [notification, setNotification] = useState<string | null>(null);

  const handleRequest = (id: number) => {
    setCards(prev =>
      prev.map(c => c.id === id ? { ...c, status: "Requested" as const } : c)
    );
    toast.success("Food request submitted!");

    // Simulate assignment after 2s
    setTimeout(() => {
      setCards(prev =>
        prev.map(c => c.id === id ? { ...c, status: "Assigned" as const } : c)
      );
      setNotification("Food has been assigned to your organization!");
      setTimeout(() => setNotification(null), 4000);
    }, 2000);
  };

  const available = cards.filter(c => c.status === "Available");
  const requested = cards.filter(c => c.status !== "Available");

  return (
    <DashboardLayout role="ngo">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl bg-primary p-4 text-primary-foreground shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Check className="h-5 w-5" />
            <span className="text-sm font-medium">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Available Food Nearby</h1>
        <p className="text-sm text-muted-foreground">Request surplus food from donors in your area</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Available Now", count: available.length, color: "text-status-available" },
          { label: "Requested", count: cards.filter(c => c.status === "Requested").length, color: "text-status-assigned" },
          { label: "Assigned / Completed", count: cards.filter(c => c.status === "Assigned" || c.status === "Completed").length, color: "text-status-completed" },
        ].map(s => (
          <div key={s.label} className="rounded-xl bg-card p-5" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}>
            <div className="text-sm font-medium text-muted-foreground">{s.label}</div>
            <div className={`mt-1 text-2xl font-bold tabular-nums ${s.color}`}>{s.count}</div>
          </div>
        ))}
      </div>

      {/* Available Cards */}
      {available.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((card, i) => (
            <motion.div
              key={card.id}
              className="rounded-xl bg-card p-5 transition-shadow hover:shadow-md"
              style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{card.name}</h3>
                  <p className="text-xs text-muted-foreground">{card.category}</p>
                </div>
                <StatusBadge status={card.status} />
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><UtensilsCrossed className="h-3.5 w-3.5" /> {card.quantity} meals</div>
                <div className="flex items-center gap-2"><User className="h-3.5 w-3.5" /> {card.donor}</div>
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Pickup by {card.deadline}</div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {card.distance} away</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => handleRequest(card.id)}>Request Food</Button>
                <Button size="sm" variant="outline" className="flex-1">View Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Requested / Assigned */}
      {requested.length > 0 && (
        <>
          <h2 className="mb-4 text-lg font-bold text-foreground">My Requests</h2>
          <div className="overflow-hidden rounded-xl bg-card" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Food</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Donor</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Qty</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requested.map(card => (
                    <tr key={card.id} className="border-b last:border-0">
                      <td className="px-4 py-4 font-medium text-foreground">{card.name}</td>
                      <td className="px-4 py-4 text-muted-foreground">{card.donor}</td>
                      <td className="px-4 py-4 tabular-nums">{card.quantity} meals</td>
                      <td className="px-4 py-4"><StatusBadge status={card.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default NgoDashboard;
