import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for occasional use",
    features: [
      "10 conversions per day",
      "Max file size: 10MB",
      "Basic file formats",
      "Standard conversion speed",
      "24-hour file storage",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    description: "For power users and professionals",
    features: [
      "Unlimited conversions",
      "Max file size: 100MB",
      "All file formats",
      "Priority conversion speed",
      "AI-enhanced quality",
      "Batch processing",
      "7-day file storage",
      "Premium support",
    ],
    cta: "Upgrade to Premium",
    popular: true,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Convert files in seconds with our optimized processing",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your files are encrypted and automatically deleted",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Access our service anytime, anywhere, on any device",
  },
];

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing Plans - ConvertMe | Affordable File Conversion</title>
        <meta
          name="description"
          content="Choose the perfect plan for your file conversion needs. Start free or upgrade to Premium for unlimited conversions, larger files, and priority support."
        />
        <meta name="keywords" content="pricing, file conversion plans, premium features, subscription" />
        <link rel="canonical" href="https://convertme.app/pricing" />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold">
                Simple,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Transparent Pricing
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your needs. Upgrade or downgrade anytime.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`p-8 relative bg-gradient-card backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-glow animate-scale-in ${
                    tier.popular
                      ? "border-primary md:scale-105"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-glow">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                    <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">/ {tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full transition-all duration-300 ${
                      tier.popular
                        ? "bg-gradient-primary hover:opacity-90 hover:scale-105"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                    size="lg"
                  >
                    <Link to="/auth/sign-up">{tier.cta}</Link>
                  </Button>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Choose ConvertMe?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-gradient-card backdrop-blur-sm border border-border/50 hover:shadow-glow transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                  >
                    <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
