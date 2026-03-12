import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, UtensilsCrossed, Truck, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImpactCounters from "@/components/ImpactCounters";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const },
};

const steps = [
  {
    icon: UtensilsCrossed,
    title: "Donors List Food",
    description: "Hotels, restaurants, and event halls list surplus food with quantity, type, and pickup deadline.",
  },
  {
    icon: Truck,
    title: "Smart Matching",
    description: "Our system matches available food with nearby NGOs based on location and need.",
  },
  {
    icon: Heart,
    title: "Communities Fed",
    description: "NGOs pick up the food and distribute it to orphanages, shelters, and communities in need.",
  },
];

const Landing = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight text-foreground">FoodBridge</span>
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild><Link to="/login">Login</Link></Button>
            <Button variant="outline" asChild><Link to="/register/donor">Register as Donor</Link></Button>
            <Button asChild><Link to="/register/ngo">Register as NGO</Link></Button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenu && (
          <div className="border-t px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" asChild className="justify-start"><Link to="/login">Login</Link></Button>
              <Button variant="outline" asChild><Link to="/register/donor">Register as Donor</Link></Button>
              <Button asChild><Link to="/register/ngo">Register as NGO</Link></Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div className="mx-auto max-w-2xl text-center" {...fadeUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <Leaf className="h-4 w-4 text-primary" />
              AI-Powered Food Redistribution
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl" style={{ letterSpacing: "-0.025em" }}>
              FoodBridge
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Connecting surplus food with communities in need. Reduce waste, feed people, make an impact.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="h-12 px-8 text-base">
                <Link to="/register/donor">
                  I Have Food to Share <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base">
                <Link to="/register/ngo">I Need Food for My Community</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="border-t bg-secondary/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div className="text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to reduce food waste</p>
          </motion.div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative rounded-2xl bg-card p-8 text-center"
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.05)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mb-1 text-sm font-semibold text-primary">Step {i + 1}</div>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Impact</h2>
            <p className="mt-3 text-muted-foreground">Together, we're making a difference</p>
          </div>
          <ImpactCounters />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          © 2026 FoodBridge. Built with ❤️ to reduce food waste.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
