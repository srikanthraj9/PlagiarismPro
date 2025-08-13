import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUploadComplete: (results: any) => void;
}

const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress updates
    const steps = [
      { message: "Extracting text...", progress: 20 },
      { message: "Counting words...", progress: 40 },
      { message: "Checking for plagiarism...", progress: 60 },
      { message: "Validating citations...", progress: 80 },
      { message: "Generating summary...", progress: 90 },
      { message: "Finalizing results...", progress: 100 },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step.progress);
      
      toast({
        title: step.message,
        description: `Processing... ${step.progress}%`,
      });
    }

    // Mock results
    const results = {
      title: file.name.replace('.pdf', ''),
      wordCount: Math.floor(Math.random() * 5000) + 1000,
      plagiarismScore: Math.floor(Math.random() * 40) + 5,
      citations: {
        valid: Math.floor(Math.random() * 15) + 5,
        invalid: Math.floor(Math.random() * 3) + 1,
        total: 0
      },
      summary: "This document discusses the application of artificial intelligence in modern healthcare systems. The paper explores various AI methodologies including machine learning algorithms, neural networks, and data processing techniques. Key findings suggest significant improvements in diagnostic accuracy and patient care efficiency when AI systems are properly integrated into healthcare workflows.",
      processedAt: new Date().toISOString()
    };

    results.citations.total = results.citations.valid + results.citations.invalid;

    onUploadComplete(results);
    setIsProcessing(false);
    setFile(null);
    setProgress(0);

    toast({
      title: "Analysis complete!",
      description: "Your document has been successfully analyzed.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Upload a PDF file to check for plagiarism, citations, and get a summary
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop your PDF here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports PDF files up to 10MB
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!isProcessing && (
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing...</span>
                  <span className="text-foreground font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Button 
              onClick={processFile} 
              className="w-full" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Document...
                </>
              ) : (
                "Analyze Document"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;