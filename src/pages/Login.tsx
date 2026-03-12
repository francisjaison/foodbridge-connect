import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: route based on email
    if (email.includes("ngo")) {
      toast.success("Welcome back!");
      navigate("/ngo/dashboard");
    } else {
      toast.success("Welcome back!");
      navigate("/donor/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-8" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 4px 6px -1px rgba(0,0,0,.1)" }}>
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">FoodBridge</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5 h-11" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1.5">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="h-11 pr-10" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="h-11 w-full text-base">Sign In</Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register/donor" className="font-medium text-primary hover:underline">Register as Donor</Link>
          {" or "}
          <Link to="/register/ngo" className="font-medium text-primary hover:underline">Register as NGO</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
