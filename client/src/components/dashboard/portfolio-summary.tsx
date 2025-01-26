import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PortfolioSummary() {
  const portfolioData = {
    total: 150000,
    allocation: [
      { name: "Stocks", percentage: 60, color: "bg-blue-600" },
      { name: "Bonds", percentage: 25, color: "bg-green-600" },
      { name: "Cash", percentage: 15, color: "bg-amber-600" }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-3xl font-bold">
            ${portfolioData.total.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
        </div>

        <div className="space-y-4">
          {portfolioData.allocation.map((asset) => (
            <div key={asset.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{asset.name}</span>
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
