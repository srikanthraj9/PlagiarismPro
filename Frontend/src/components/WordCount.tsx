import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp } from "lucide-react";

interface WordCountProps {
  count: number;
  title: string;
}

const WordCount = ({ count, title }: WordCountProps) => {
  const getWordCountCategory = (count: number) => {
    if (count < 500) return { label: "Short", color: "text-warning", bg: "bg-warning/10" };
    if (count < 2000) return { label: "Medium", color: "text-accent", bg: "bg-accent/10" };
    if (count < 5000) return { label: "Long", color: "text-success", bg: "bg-success/10" };
    return { label: "Very Long", color: "text-primary", bg: "bg-primary/10" };
  };

  const category = getWordCountCategory(count);
  const estimatedReadTime = Math.ceil(count / 200); // Average reading speed

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Document Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            {count.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Words</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Document Title:</span>
            <span className="text-sm font-medium text-foreground truncate max-w-32" title={title}>
              {title}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Length Category:</span>
            <Badge variant="outline" className={`${category.color} border-current`}>
              {category.label}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Est. Reading Time:</span>
            <div className="flex items-center space-x-1 text-sm font-medium text-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>{estimatedReadTime} min</span>
            </div>
          </div>
        </div>

        <div className={`p-3 rounded-lg ${category.bg}`}>
          <div className="text-sm text-center">
            <span className="font-medium">Characters: </span>
            <span className="text-muted-foreground">{(count * 5.5).toFixed(0)}</span>
            <span className="mx-2">•</span>
            <span className="font-medium">Pages: </span>
            <span className="text-muted-foreground">~{Math.ceil(count / 250)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordCount;