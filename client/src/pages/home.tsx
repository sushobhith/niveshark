import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="content-width text-center">
          <h1 className="heading-1 text-foreground mb-6 animate-in fade-in slide-in-from-bottom duration-500">
            AI-Powered Investment Management
          </h1>
          <p className="body-text mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-500 delay-150">
            Let our advanced AI algorithms optimize your investment portfolio for maximum returns while managing risk.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 btn-hover animate-in fade-in slide-in-from-bottom duration-500 delay-300"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}