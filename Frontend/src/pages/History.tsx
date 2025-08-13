import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText, TrendingUp, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface HistoryItem {
  id: number;
  title: string;
  wordCount: number;
  plagiarismScore: number;
  citations: {
    valid: number;
    invalid: number;
    total: number;
  };
  timestamp: string;
  processedAt: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem("analysisHistory") || "[]");
    setHistory(savedHistory);
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getPlagiarismBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score < 10) return "default";
    if (score < 25) return "secondary";
    return "destructive";
  };

  const getPlagiarismLabel = (score: number) => {
    if (score < 10) return "Excellent";
    if (score < 25) return "Good";
    if (score < 50) return "Moderate";
    return "High Risk";
  };

  const handleDownload = (item: HistoryItem) => {
    // Simulate download
    toast({
      title: "Report downloaded",
      description: `Downloaded report for "${item.title}"`,
    });
  };

  const handleDelete = (id: number) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("analysisHistory", JSON.stringify(updatedHistory));
    
    toast({
      title: "Item deleted",
      description: "The analysis has been removed from your history.",
    });
  };

  if (history.length === 0) {
    return (
      <Layout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analysis History</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your past document analyses.
            </p>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-foreground mb-2">No analyses yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by uploading your first document to see your analysis history here.
              </p>
              <Button asChild>
                <a href="/dashboard">Upload Document</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analysis History</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your past document analyses.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {history.length} total analyses
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {history.map((item) => {
            const dateTime = formatDate(item.timestamp);
            const validCitationPercentage = item.citations.total > 0 
              ? Math.round((item.citations.valid / item.citations.total) * 100) 
              : 0;

            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{dateTime.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>at {dateTime.time}</span>
                        </div>
                      </CardDescription>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDownload(item)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(item.id)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Word Count */}
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Word Count</div>
                      <div className="text-lg font-semibold text-foreground">
                        {item.wordCount.toLocaleString()}
                      </div>
                    </div>

                    {/* Plagiarism Score */}
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Plagiarism</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-foreground">
                          {item.plagiarismScore}%
                        </span>
                        <Badge 
                          variant={getPlagiarismBadgeVariant(item.plagiarismScore)}
                          className="text-xs"
                        >
                          {getPlagiarismLabel(item.plagiarismScore)}
                        </Badge>
                      </div>
                    </div>

                    {/* Citations */}
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Citations</div>
                      <div className="text-lg font-semibold text-foreground">
                        {item.citations.valid}/{item.citations.total}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({validCitationPercentage}%)
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-end justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload(item)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Summary Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {history.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Analyses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(history.reduce((acc, item) => acc + item.wordCount, 0) / history.length).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Words</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(history.reduce((acc, item) => acc + item.plagiarismScore, 0) / history.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Plagiarism</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(history.reduce((acc, item) => acc + (item.citations.valid / Math.max(item.citations.total, 1)) * 100, 0) / history.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Valid Citations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default History;