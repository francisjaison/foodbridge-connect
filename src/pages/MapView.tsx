import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const locations = [
  { name: "Grand Hotel", type: "donor", x: 35, y: 30 },
  { name: "Royal Restaurant", type: "donor", x: 55, y: 45 },
  { name: "Celebration Hall", type: "donor", x: 70, y: 25 },
  { name: "Sweet Palace", type: "donor", x: 25, y: 60 },
  { name: "Helping Hands NGO", type: "ngo", x: 45, y: 55 },
  { name: "City Orphanage", type: "ngo", x: 60, y: 70 },
  { name: "Elder Care Home", type: "ngo", x: 30, y: 75 },
];

const MapView = () => (
  <DashboardLayout role="donor">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">Map View</h1>
      <p className="text-sm text-muted-foreground">Donor and NGO locations with available food</p>
    </div>

    {/* Legend */}
    <div className="mb-4 flex gap-6">
      <div className="flex items-center gap-2 text-sm">
        <div className="h-3 w-3 rounded-full bg-primary" />
        <span className="text-muted-foreground">Food Donors</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="h-3 w-3 rounded-full bg-status-available" />
        <span className="text-muted-foreground">NGOs / Receivers</span>
      </div>
    </div>

    {/* Map placeholder */}
    <div
      className="relative h-[500px] overflow-hidden rounded-xl bg-secondary"
      style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Labels */}
      <div className="absolute left-4 top-4 rounded-lg bg-card px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm">
        📍 City Center Area
      </div>

      {/* Pins */}
      {locations.map((loc, i) => (
        <motion.div
          key={loc.name}
          className="group absolute"
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full cursor-pointer">
            <MapPin
              className={`h-7 w-7 drop-shadow-md ${loc.type === "donor" ? "text-primary" : "text-status-available"}`}
              fill="currentColor"
              strokeWidth={1.5}
              stroke="white"
            />
            <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-md group-hover:block">
              {loc.name}
              <span className="ml-1 text-muted-foreground">({loc.type === "donor" ? "Donor" : "NGO"})</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </DashboardLayout>
);

export default MapView;
