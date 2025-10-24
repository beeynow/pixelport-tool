import { FileType, Zap, Shield, Download, Sparkles, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Convert your files in seconds with our optimized conversion engine. No waiting, just results.",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your files are encrypted and automatically deleted after 24 hours. Privacy is our priority.",
  },
  {
    icon: FileType,
    title: "Multiple Formats",
    description: "Support for PDF, Word, JPG, PNG, and more. Convert between any format seamlessly.",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Get your converted files immediately. No queues, no delays, just instant downloads.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Premium users get access to AI-enhanced conversions for perfect quality every time.",
  },
  {
    icon: Clock,
    title: "Batch Processing",
    description: "Convert multiple files at once and save time. Perfect for professionals with heavy workloads.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ConvertMe
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The most powerful and user-friendly file conversion platform available today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
