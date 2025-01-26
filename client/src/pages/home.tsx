import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Shield, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import PortfolioSummary from "@/components/dashboard/portfolio-summary";
import InvestmentStats from "@/components/dashboard/investment-stats";

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

      {/* Features */}
      <section className="section-padding bg-muted/30">
        <div className="content-width grid gap-8 md:grid-cols-3">
          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Bot className="h-8 w-8 text-primary mb-4" />
              <CardTitle>AI-Driven Strategy</CardTitle>
            </CardHeader>
            <CardContent className="body-text">
              Advanced algorithms analyze market trends and optimize your portfolio in real-time.
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Risk Management</CardTitle>
            </CardHeader>
            <CardContent className="body-text">
              Sophisticated risk assessment and mitigation strategies to protect your investments.
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Performance Tracking</CardTitle>
            </CardHeader>
            <CardContent className="body-text">
              Real-time monitoring and detailed analytics of your investment performance.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="section-padding">
        <div className="content-width">
          <h2 className="heading-2 text-center mb-12">Your Investment Dashboard</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
              <PortfolioSummary />
            </div>
            <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
              <InvestmentStats />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}