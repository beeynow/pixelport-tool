import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Shield, Clock } from "lucide-react";
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
        <title>Free Online File Converter - No Signup Required | ConvertMe</title>
        <meta
          name="description"
          content="100% free online file converter. Convert PDF, images, audio, video & documents. No signup, no limits, completely free forever. Fast & secure conversions."
        />
        <meta name="keywords" content="free file converter, online converter, PDF converter free, image converter, video converter, audio converter, no signup" />
        <link rel="canonical" href="https://convertme.app/pricing" />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold">
                100% Free{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Online File Converter
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Free online file converter with unlimited conversions. No signup, no hidden fees, always free.
              </p>
            </div>

            {/* Pricing Card */}
            <div className="flex justify-center max-w-2xl mx-auto mb-20">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className="p-8 relative bg-gradient-card backdrop-blur-sm border-2 border-primary transition-all duration-300 shadow-glow animate-scale-in w-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-glow">
                      100% Free Forever
                    </span>
                  </div>

                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2">{tier.name}</h2>
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
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Link to="/conversions">{tier.cta}</Link>
                  </Button>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">
                Why Choose Our Free Online File Converter?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Convert files online free with our powerful tools. No registration required.
              </p>
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
        <CookieConsent />
      </div>
    </>
  );
};

export default Pricing;
