import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CheckCircle, XCircle, FileText } from "lucide-react";

interface CitationChartProps {
  citations: {
    valid: number;
    invalid: number;
    total: number;
  };
}

const CitationChart = ({ citations }: CitationChartProps) => {
  const data = [
    {
      name: "Valid Citations",
      value: citations.valid,
      color: "hsl(var(--success))",
    },
    {
      name: "Invalid Citations",
      value: citations.invalid,
      color: "hsl(var(--destructive))",
    },
  ];

  const validPercentage = citations.total > 0 ? Math.round((citations.valid / citations.total) * 100) : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{data.name}</p>
          <p className="text-muted-foreground">
            Count: <span className="font-medium text-foreground">{data.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Citation Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{citations.total}</div>
              <div className="text-sm text-muted-foreground">Total Citations</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-success">{citations.valid}</div>
              <div className="text-sm text-muted-foreground">Valid</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-destructive">{citations.invalid}</div>
              <div className="text-sm text-muted-foreground">Invalid</div>
            </div>
          </div>

          {/* Pie Chart */}
          {citations.total > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No citations detected</p>
              </div>
            </div>
          )}

          {/* Validity Score */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              {validPercentage >= 80 ? (
                <CheckCircle className="h-6 w-6 text-success" />
              ) : (
                <XCircle className="h-6 w-6 text-destructive" />
              )}
              <div>
                <div className="font-medium text-foreground">Citation Validity</div>
                <div className="text-sm text-muted-foreground">
                  {validPercentage >= 80 ? "Excellent citation quality" : "Some citations need attention"}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{validPercentage}%</div>
              <div className="text-sm text-muted-foreground">Valid</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CitationChart;