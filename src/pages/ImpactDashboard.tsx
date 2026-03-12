import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, Users, Wind, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ImpactCounters from "@/components/ImpactCounters";

const weeklyData = [
  { day: "Mon", meals: 120 },
  { day: "Tue", meals: 180 },
  { day: "Wed", meals: 95 },
  { day: "Thu", meals: 210 },
  { day: "Fri", meals: 300 },
  { day: "Sat", meals: 450 },
  { day: "Sun", meals: 380 },
];

const maxMeals = Math.max(...weeklyData.map(d => d.meals));

const ImpactDashboard = () => (
  <DashboardLayout role="donor">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">Impact Dashboard</h1>
      <p className="text-sm text-muted-foreground">Track the positive impact of food redistribution</p>
    </div>

    <ImpactCounters />

    {/* Weekly Chart */}
    <div className="mt-8 rounded-xl bg-card p-6" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}>
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Meals Saved This Week</h2>
      </div>
      <div className="flex items-end gap-3 h-48">
        {weeklyData.map((d, i) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-medium tabular-nums text-muted-foreground">{d.meals}</span>
            <motion.div
              className="w-full rounded-t-lg bg-primary/80"
              initial={{ height: 0 }}
              animate={{ height: `${(d.meals / maxMeals) * 100}%` }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            />
            <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Activity */}
    <div className="mt-8 rounded-xl bg-card p-6" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}>
      <h2 className="mb-4 text-lg font-bold text-foreground">Recent Activity</h2>
      <div className="space-y-3">
        {[
          { text: "50 meals of Biryani picked up by Helping Hands NGO", time: "2 hours ago" },
          { text: "30 meals of Chapati assigned to City Orphanage", time: "4 hours ago" },
          { text: "100 packed meals listed by Celebration Hall", time: "6 hours ago" },
          { text: "60 meals of Rice & Curry completed delivery", time: "Yesterday" },
        ].map((a, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="text-sm text-foreground">{a.text}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default ImpactDashboard;
