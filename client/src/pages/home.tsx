import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { AuthDialog } from "@/components/auth/auth-dialog";

const SharkLogo = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8C18 8 8 24 8 32C8 40 18 56 32 56C46 56 56 40 56 32C56 24 46 8 32 8Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 28L32 40L44 28" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 24V48" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 20L36 20L32 16L28 20Z" fill="currentColor"/>
  </svg>
);

export default function Home() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');

  const handleAuthClick = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setShowAuthDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="content-width">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Logo and Title Container */}
            <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom duration-500">
              <SharkLogo />
              <h1 className="heading-1 text-foreground">Niveshark</h1>
            </div>

            <p className="body-text mb-8 animate-in fade-in slide-in-from-bottom duration-500 delay-150">
              Your AI-Powered personal investment manager
            </p>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 btn-hover animate-in fade-in slide-in-from-bottom duration-500 delay-300"
              onClick={() => handleAuthClick('signin')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-muted/30">
        <div className="content-width grid gap-8 md:grid-cols-3">
          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <Bot className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">AI-Driven Strategy</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyze market trends and optimize your portfolio in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Risk Management</h3>
              <p className="text-sm text-muted-foreground">
                Sophisticated risk assessment and mitigation strategies to protect your investments.
              </p>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Performance Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring and detailed analytics of your investment performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        defaultTab={authType}
      />
    </div>
  );
}