import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AuthDialog } from "@/components/auth/auth-dialog";

export default function Home() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');

  const handleAuthClick = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setShowAuthDialog(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Branding and Message */}
          <div className="flex-1 max-w-2xl mb-12 md:mb-0">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/80 mb-6 font-poppins">
              Niveshark
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-manrope">
              Your personal AI-powered investment manager
            </p>
          </div>

          {/* Authentication Buttons */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => handleAuthClick('signin')}
              className="hover:bg-white/5 text-lg px-8"
            >
              Sign In
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-lg px-8"
              onClick={() => handleAuthClick('signup')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        defaultTab={authType}
      />
    </div>
  );
}