import { useState } from "react";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import PlagiarismGauge from "@/components/PlagiarismGauge";
import CitationChart from "@/components/CitationChart";
import WordCount from "@/components/WordCount";
import SummaryCard from "@/components/SummaryCard";
import ReportActions from "@/components/ReportActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, FileCheck, Users, Clock } from "lucide-react";

const Dashboard = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleUploadComplete = (results: any) => {
    setAnalysisResults(results);
    
    // Save to history (in a real app, this would be saved to backend)
    const existingHistory = JSON.parse(localStorage.getItem("analysisHistory") || "[]");
    const newEntry = {
      id: Date.now(),
      ...results,
      timestamp: new Date().toISOString()
    };
    existingHistory.unshift(newEntry);
    localStorage.setItem("analysisHistory", JSON.stringify(existingHistory.slice(0, 10))); // Keep last 10
  };

  const stats = [
    {
      title: "Documents Analyzed",
      value: "127",
      icon: FileCheck,
      trend: "+12%",
      description: "from last month"
    },
    {
      title: "Avg. Plagiarism Score",
      value: "8.3%",
      icon: TrendingUp,
      trend: "-2.1%",
      description: "improvement"
    },
    {
      title: "Total Users",
      value: "2,341",
      icon: Users,
      trend: "+18%",
      description: "active users"
    },
    {
      title: "Processing Time",
      value: "1.2s",
      icon: Clock,
      trend: "-0.3s",
      description: "avg response"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Upload and analyze your documents for plagiarism, citations, and get AI-powered insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{stat.trend}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <FileUpload onUploadComplete={handleUploadComplete} />

        {/* Results Section */}
        {analysisResults && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Analysis Results</h2>
              <p className="text-muted-foreground">
                Document: <span className="font-medium text-foreground">{analysisResults.title}</span>
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <WordCount count={analysisResults.wordCount} title={analysisResults.title} />
                <PlagiarismGauge score={analysisResults.plagiarismScore} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <CitationChart citations={analysisResults.citations} />
                <ReportActions results={analysisResults} />
              </div>
            </div>

            {/* Summary - Full Width */}
            <SummaryCard summary={analysisResults.summary} />
          </div>
        )}

        {/* Getting Started Card */}
        {!analysisResults && (
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileCheck className="h-6 w-6 text-accent" />
                <span>Welcome to PlagiarismPro</span>
              </CardTitle>
              <CardDescription>
                Get started by uploading your first document for comprehensive analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-accent font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-foreground">Upload PDF</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or select your PDF document
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-accent font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-foreground">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI checks for plagiarism and validates citations
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-foreground">Get Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Download reports and get detailed insights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;