import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AI Invest</span>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Portfolio</Button>
          <Button variant="ghost">Analytics</Button>
          <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
        </div>
      </div>
    </nav>
  );
}
