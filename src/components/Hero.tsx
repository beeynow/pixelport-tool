import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-soft">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Fast & Secure File Conversion</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Convert Your Files{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Transform PDFs, images, and documents in seconds. No software installation required. 
            Just drag, drop, and download.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-primary hover:opacity-90 transition-all shadow-glow text-lg px-8 py-6 group"
            >
              <Link to="/dashboard">
                Upload Your File Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-2 hover:border-primary hover:bg-primary/5"
            >
              <Link to="/#features">
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>No Sign Up Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
