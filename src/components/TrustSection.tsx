import { Shield, Lock, Trash2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const trustFeatures = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "All uploads are SSL encrypted for maximum security",
  },
  {
    icon: Trash2,
    title: "Auto-Delete",
    description: "Files permanently deleted immediately after download",
  },
  {
    icon: Lock,
    title: "No Storage",
    description: "We do not store your files on our servers",
  },
  {
    icon: Clock,
    title: "Instant Processing",
    description: "Lightning-fast conversion with no waiting time",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Your Privacy is Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Priority
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert files with complete confidence. Your data remains private
            and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            No logs, no cookies required, no user accounts. Your privacy is
            guaranteed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              to="/privacy"
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              to="/terms"
              className="text-primary hover:underline font-medium"
            >
              Terms of Service
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              to="/about"
              className="text-primary hover:underline font-medium"
            >
              About Us
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              to="/contact"
              className="text-primary hover:underline font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
