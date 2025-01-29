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
    <nav className="border-b border-white/10 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary animate-pulse" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            AI Invest
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="hover:bg-white/5">
                  Dashboard
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost" className="hover:bg-white/5">
                  Portfolio
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost" className="hover:bg-white/5">
                  Analytics
                </Button>
              </Link>
              <Button 
                onClick={signOut} 
                variant="outline" 
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => handleAuthClick('signin')}
                className="hover:bg-white/5"
              >
                Sign In
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
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