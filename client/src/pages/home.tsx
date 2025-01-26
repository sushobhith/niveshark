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
      <section className="px-6 py-24 sm:px-12 md:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            AI-Powered Investment Management
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Let our advanced AI algorithms optimize your investment portfolio for maximum returns while managing risk.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-muted/30 sm:px-12">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Bot className="h-8 w-8 text-primary mb-4" />
              <CardTitle>AI-Driven Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              Advanced algorithms analyze market trends and optimize your portfolio in real-time.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Risk Management</CardTitle>
            </CardHeader>
            <CardContent>
              Sophisticated risk assessment and mitigation strategies to protect your investments.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Performance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              Real-time monitoring and detailed analytics of your investment performance.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-6 py-16 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Investment Dashboard</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <PortfolioSummary />
            <InvestmentStats />
          </div>
        </div>
      </section>
    </div>
  );
}
