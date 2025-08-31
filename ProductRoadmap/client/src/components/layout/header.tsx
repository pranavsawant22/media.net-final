import { Rocket, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Header() {
  const [location, setLocation] = useLocation();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="text-primary-foreground text-sm" size={16} />
            </div>
            <h1 className="text-xl font-semibold text-foreground">AdEasy</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setLocation("/")}
              className={`text-muted-foreground hover:text-foreground transition-colors ${location === "/" ? "text-foreground font-medium" : ""}`}
              data-testid="nav-campaigns"
            >
              Campaigns
            </button>
            <button 
              onClick={() => setLocation("/dashboard")}
              className={`text-muted-foreground hover:text-foreground transition-colors ${location === "/dashboard" ? "text-foreground font-medium" : ""}`}
              data-testid="nav-dashboard"
            >
              Dashboard
            </button>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Help
            </a>
            <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors" data-testid="button-account">
              <User className="mr-2" size={16} />
              Account
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
