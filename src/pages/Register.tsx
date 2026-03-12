import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Register = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const isDonor = role === "donor";
  const title = isDonor ? "Register as Food Donor" : "Register as NGO / Receiver";

  const [form, setForm] = useState({
    name: "", organization: "", phone: "", email: "", location: "", password: "",
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Registration successful! Redirecting...");
    navigate(isDonor ? "/donor/dashboard" : "/ngo/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-card p-8" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 4px 6px -1px rgba(0,0,0,.1)" }}>
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">FoodBridge</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isDonor ? "Share surplus food with those in need" : "Find available food near your organization"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { id: "organization", label: isDonor ? "Restaurant / Hotel Name" : "NGO / Organization Name", type: "text", placeholder: isDonor ? "Grand Hotel" : "Helping Hands NGO" },
            { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
            { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { id: "location", label: "Location / Address", type: "text", placeholder: "123 Main St, City" },
            { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
          ].map(field => (
            <div key={field.id}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.id as keyof typeof form]}
                onChange={e => update(field.id, e.target.value)}
                className="mt-1.5 h-11"
                required
              />
            </div>
          ))}
          <Button type="submit" className="h-11 w-full text-base">Create Account</Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
