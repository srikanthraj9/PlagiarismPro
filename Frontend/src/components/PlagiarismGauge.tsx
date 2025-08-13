import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface PlagiarismGaugeProps {
  score: number;
}

const PlagiarismGauge = ({ score }: PlagiarismGaugeProps) => {
  const getScoreColor = (score: number) => {
    if (score < 10) return "text-success";
    if (score < 25) return "text-warning";
    if (score < 50) return "text-orange-500";
    return "text-destructive";
  };

  const getScoreBackground = (score: number) => {
    if (score < 10) return "from-success/20 to-success/5";
    if (score < 25) return "from-warning/20 to-warning/5";
    if (score < 50) return "from-orange-500/20 to-orange-500/5";
    return "from-destructive/20 to-destructive/5";
  };

  const getScoreLabel = (score: number) => {
    if (score < 10) return "Excellent";
    if (score < 25) return "Good";
    if (score < 50) return "Moderate";
    return "High Risk";
  };

  const getScoreIcon = (score: number) => {
    if (score < 10) return <CheckCircle className="h-5 w-5" />;
    if (score < 25) return <AlertCircle className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score < 10) return "default";
    if (score < 25) return "secondary";
    return "destructive";
  };

  // Calculate the angle for the gauge (180 degrees max)
  const angle = Math.min((score / 100) * 180, 180);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <span>Plagiarism Score</span>
          {getScoreIcon(score)}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="relative inline-block">
          {/* Gauge Background */}
          <div className="relative w-48 h-24 mx-auto mb-4">
            <svg
              width="192"
              height="96"
              viewBox="0 0 192 96"
              className="absolute inset-0"
            >
              {/* Background Arc */}
              <path
                d="M 16 80 A 80 80 0 0 1 176 80"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="8"
                strokeLinecap="round"
              />
              
              {/* Progress Arc */}
              <path
                d="M 16 80 A 80 80 0 0 1 176 80"
                fill="none"
                stroke={`hsl(var(--${score < 10 ? 'success' : score < 25 ? 'warning' : score < 50 ? 'orange-500' : 'destructive'}))`}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(angle / 180) * 251.3} 251.3`}
                className="transition-all duration-1000 ease-out"
                style={{
                  transform: "rotate(0deg)",
                  transformOrigin: "96px 80px"
                }}
              />
            </svg>
            
            {/* Center Score */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-center ${getScoreColor(score)}`}>
                <div className="text-3xl font-bold">{score}%</div>
                <div className="text-sm text-muted-foreground">Similar</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Badge 
            variant={getScoreBadgeVariant(score)}
            className="text-sm px-3 py-1"
          >
            {getScoreLabel(score)}
          </Badge>
          
          <div className={`p-3 rounded-lg bg-gradient-to-r ${getScoreBackground(score)}`}>
            <p className="text-sm text-muted-foreground">
              {score < 10 && "Great job! Your document appears to be highly original with minimal similarity to existing sources."}
              {score >= 10 && score < 25 && "Good originality. Some common phrases detected, but overall acceptable."}
              {score >= 25 && score < 50 && "Moderate similarity detected. Consider reviewing and revising similar sections."}
              {score >= 50 && "High similarity detected. Significant revision recommended to improve originality."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlagiarismGauge;