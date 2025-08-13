import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportActionsProps {
  results: any;
}

const ReportActions = ({ results }: ReportActionsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a mock PDF download
    const element = document.createElement('a');
    element.href = 'data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCg=='; // Minimal PDF header
    element.download = `${results.title}_plagiarism_report.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setIsDownloading(false);
    
    toast({
      title: "Report downloaded",
      description: "Your plagiarism report has been downloaded successfully.",
    });
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSendingEmail(false);
    setEmailSent(true);
    
    toast({
      title: "Email sent successfully",
      description: "The plagiarism report has been sent to your email address.",
    });
    
    // Reset email sent status after 3 seconds
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export & Share</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="w-full"
            variant="default"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </>
            )}
          </Button>

          <Button 
            onClick={handleSendEmail} 
            disabled={isSendingEmail || emailSent}
            className="w-full"
            variant="outline"
          >
            {isSendingEmail ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : emailSent ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Email Sent
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Email Report
              </>
            )}
          </Button>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Report includes:</span>
            </div>
            <ul className="text-xs space-y-1 ml-2">
              <li>• Plagiarism analysis with detailed breakdown</li>
              <li>• Citation validation results</li>
              <li>• AI-generated summary</li>
              <li>• Word count and document statistics</li>
              <li>• Professional formatting</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportActions;