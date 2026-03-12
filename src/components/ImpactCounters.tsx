import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, Users, Wind } from "lucide-react";

const counters = [
  { label: "Meals Saved", value: 12480, icon: UtensilsCrossed, suffix: "+" },
  { label: "Kg Food Waste Prevented", value: 5200, icon: Leaf, suffix: "kg" },
  { label: "NGOs Supported", value: 85, icon: Users, suffix: "" },
  { label: "CO₂ Reduced", value: 3100, icon: Wind, suffix: "kg" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const ImpactCounters = () => (
  <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {counters.map((item, i) => (
      <motion.div
        key={item.label}
        className="rounded-2xl bg-card p-6 text-center"
        style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <item.icon className="h-6 w-6 text-primary" />
        </div>
        <div className="text-3xl font-extrabold text-foreground">
          <AnimatedNumber value={item.value} suffix={item.suffix} />
        </div>
        <div className="mt-1 text-sm font-medium text-muted-foreground">{item.label}</div>
      </motion.div>
    ))}
  </div>
);

export default ImpactCounters;
