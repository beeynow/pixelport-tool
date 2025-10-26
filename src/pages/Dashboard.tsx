import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConversionTracking } from "@/hooks/useConversionTracking";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  FileText, 
  FileImage, 
  FileCode, 
  FileVideo,
  Sparkles,
  ArrowRight,
  Crown
} from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const { getConversionStats } = useConversionTracking();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getConversionStats();
    setStats(data);
  };

  const conversionCategories = [
    {
      title: "PDF Tools",
      icon: FileText,
      description: "Convert, merge, split PDFs",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Image Tools",
      icon: FileImage,
      description: "Convert & compress images",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Document Tools",
      icon: FileCode,
      description: "Word, Excel, CSV conversions",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Media Tools",
      icon: FileVideo,
      description: "Audio & video processing",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, <span className="bg-gradient-primary bg-clip-text text-transparent">{user?.firstName || "User"}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Your file conversion dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">
                  {stats?.subscription_tier === 'premium' ? 'Premium' : 'Free'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.conversions_today || 0}
                <span className="text-sm text-muted-foreground ml-2">
                  / {stats?.subscription_tier === 'premium' ? 'Unlimited' : '50'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Max File Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.subscription_tier === 'premium' ? '100MB' : '10MB'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Banner for Free Users */}
        {stats?.subscription_tier === 'free' && (
          <Card className="mb-12 bg-gradient-primary border-0 text-white shadow-glow animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Upgrade to Premium
              </CardTitle>
              <CardDescription className="text-white/80">
                Get unlimited conversions, larger file sizes, and priority processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Conversion Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Conversion Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversionCategories.map((category, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 transition-opacity group"
            asChild
          >
            <Link to="/conversions">
              Start Converting
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
