import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function InvestmentStats() {
  const data = [
    { month: "Jan", value: 100000 },
    { month: "Feb", value: 110000 },
    { month: "Mar", value: 108000 },
    { month: "Apr", value: 115000 },
    { month: "May", value: 125000 },
    { month: "Jun", value: 130000 },
    { month: "Jul", value: 150000 }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Performance History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(51, 100%, 50%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(51, 100%, 50%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(13, 13, 13, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(51, 100%, 50%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}