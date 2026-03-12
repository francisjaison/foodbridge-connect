import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, LayoutDashboard, MapPin, BarChart3, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "donor" | "ngo";
}

const navItems = {
  donor: [
    { label: "Dashboard", path: "/donor/dashboard", icon: LayoutDashboard },
    { label: "Map View", path: "/map", icon: MapPin },
    { label: "Impact", path: "/impact", icon: BarChart3 },
  ],
  ngo: [
    { label: "Dashboard", path: "/ngo/dashboard", icon: LayoutDashboard },
    { label: "Map View", path: "/map", icon: MapPin },
    { label: "Impact", path: "/impact", icon: BarChart3 },
  ],
};

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = navItems[role];

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Leaf className="h-5 w-5 text-primary" />
        <span className="text-base font-bold text-foreground">FoodBridge</span>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={() => navigate("/")}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-card lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-card shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-sm sm:px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="text-sm font-medium text-muted-foreground capitalize">
            {role === "donor" ? "Donor" : "NGO"} Dashboard
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
