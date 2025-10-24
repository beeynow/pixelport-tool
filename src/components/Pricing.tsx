import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
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

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-8 relative bg-gradient-card backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-glow animate-fade-in ${
                tier.popular
                  ? "border-primary scale-105 md:scale-110"
                  : "border-border/50 hover:border-primary/30"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-glow">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
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
                className={`w-full ${
                  tier.popular
                    ? "bg-gradient-primary hover:opacity-90"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
                size="lg"
              >
                <Link to="/auth">{tier.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
