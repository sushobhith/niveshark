import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function Navbar() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const { user, signOut } = useAuth();

  const handleAuthClick = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setShowAuthDialog(true);
  };

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AI Invest</span>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost">Portfolio</Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost">Analytics</Button>
              </Link>
              <Button onClick={signOut} variant="outline">Sign Out</Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => handleAuthClick('signin')}
              >
                Sign In
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => handleAuthClick('signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        defaultTab={authType}
      />
    </nav>
  );
}