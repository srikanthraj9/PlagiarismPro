import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Globe,
  Sparkles
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Plagiarism Detection",
      description: "Our AI-powered system scans millions of sources to detect potential plagiarism with high accuracy."
    },
    {
      icon: FileCheck,
      title: "Citation Validation",
      description: "Automatically verify the validity and formatting of citations in your documents."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Summarization",
      description: "Get intelligent summaries of your documents using state-of-the-art language models."
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Analyze documents in seconds with our optimized processing pipeline."
    },
    {
      icon: Globe,
      title: "Multiple Sources",
      description: "Compare against academic papers, web content, and published literature."
    },
    {
      icon: TrendingUp,
      title: "Detailed Analytics",
      description: "Get comprehensive reports with visual charts and actionable insights."
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "For Students",
      description: "Ensure your assignments are original and properly cited before submission.",
      items: ["Academic integrity", "Citation help", "Writing improvement", "Confidence in submissions"]
    },
    {
      icon: Target,
      title: "For Researchers",
      description: "Maintain research standards and verify the originality of your work.",
      items: ["Research validation", "Source verification", "Publication readiness", "Academic credibility"]
    },
    {
      icon: Lightbulb,
      title: "For Educators",
      description: "Help students learn proper citation and maintain academic honesty.",
      items: ["Teaching tool", "Quick verification", "Student guidance", "Academic standards"]
    }
  ];

  const futureScope = [
    "Multi-language support for global accessibility",
    "Integration with popular writing platforms",
    "Real-time plagiarism checking while writing",
    "Advanced AI fact-checking capabilities",
    "Collaborative document review features",
    "Enhanced citation style support (APA, MLA, Chicago, etc.)",
    "API access for institutional integrations",
    "Mobile app for on-the-go document checking"
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-accent/20 rounded-full">
              <FileCheck className="h-12 w-12 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">About PlagiarismPro</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering students, researchers, and educators with advanced AI-powered plagiarism detection, 
            citation validation, and document analysis tools.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                To promote academic integrity and support quality research by providing accessible, 
                accurate, and comprehensive document analysis tools that help users create original, 
                well-cited, and impactful content.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">How PlagiarismPro Helps</h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <benefit.icon className="h-8 w-8 text-accent" />
                    <div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {benefit.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Technology & Security</CardTitle>
            <CardDescription>
              Built with cutting-edge technology to ensure accuracy, speed, and security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Advanced AI Models",
                "Machine Learning",
                "Natural Language Processing",
                "Secure Cloud Infrastructure",
                "Real-time Processing",
                "Data Encryption",
                "Privacy Protection",
                "Scalable Architecture"
              ].map((tech, index) => (
                <Badge key={index} variant="outline" className="justify-center p-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Future Scope */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <TrendingUp className="h-6 w-6" />
              <span>Future Roadmap</span>
            </CardTitle>
            <CardDescription>
              Exciting features and improvements coming soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {futureScope.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-1 bg-accent/20 rounded-full mt-1">
                    <Lightbulb className="h-3 w-3 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-foreground">10M+</div>
                <div className="text-sm text-muted-foreground">Documents Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">99.2%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg. Processing Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to ensure your document's integrity?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of students and researchers who trust PlagiarismPro 
              for their document analysis needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;