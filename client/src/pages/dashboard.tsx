import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { ClipboardList, TrendingUp, User } from "lucide-react";
import { Link } from "wouter";
import PortfolioSummary from "@/components/dashboard/portfolio-summary";
import InvestmentStats from "@/components/dashboard/investment-stats";

export default function Dashboard() {
  const { user, financialDetails } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-8 sm:px-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome, {user?.username}!
              </h1>
              <p className="text-muted-foreground mt-1">
                {financialDetails ? 'Here\'s your investment overview' : 'Let\'s start your investment journey'}
              </p>
            </div>
            {!financialDetails && (
              <Link href="/questionnaire">
                <Button className="bg-primary hover:bg-primary/90">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Complete Financial Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 sm:px-12">
        {financialDetails ? (
          <>
            {/* Financial Overview */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Risk Tolerance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{financialDetails.riskTolerance}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Investment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    ${financialDetails.monthlyInvestment.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Investment Horizon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{financialDetails.investmentHorizon}</p>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio and Performance */}
            <div className="grid gap-8 md:grid-cols-2">
              <PortfolioSummary />
              <InvestmentStats />
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Complete Your Financial Profile</h2>
              <p className="text-muted-foreground mb-6">
                Take our questionnaire to receive personalized investment recommendations
              </p>
              <Link href="/questionnaire">
                <Button className="bg-primary hover:bg-primary/90">
                  Start Questionnaire
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
