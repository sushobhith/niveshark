import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PortfolioSummary() {
  const portfolioData = {
    total: 150000,
    allocation: [
      { name: "Stocks", percentage: 60, color: "bg-primary" },
      { name: "Bonds", percentage: 25, color: "bg-primary/60" },
      { name: "Cash", percentage: 15, color: "bg-primary/30" }
    ]
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            ${portfolioData.total.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
        </div>

        <div className="space-y-4">
          {portfolioData.allocation.map((asset) => (
            <div key={asset.name} className="space-y-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{asset.name}</span>
                <span className="text-sm text-muted-foreground">
                  {asset.percentage}%
                </span>
              </div>
              <Progress
                value={asset.percentage}
                className={`h-2 ${asset.color}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}