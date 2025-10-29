import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const pricingTiers = [
  {
    name: "Free Forever",
    price: "$0",
    period: "always free",
    description: "Everything you need, completely free",
    features: [
      "Unlimited conversions",
      "All file formats supported",
      "Fast conversion speed",
      "No signup required",
      "100% secure & private",
      "Batch processing",
      "No ads or watermarks",
      "Mobile & desktop friendly",
    ],
    cta: "Start Converting Now",
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

        <div className="flex justify-center max-w-2xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className="p-8 relative bg-gradient-card backdrop-blur-sm border-2 border-primary transition-all duration-300 shadow-glow animate-fade-in w-full"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-glow">
                  100% Free
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground text-lg">/ {tier.period}</span>
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
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                <Link to="/conversions">{tier.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
