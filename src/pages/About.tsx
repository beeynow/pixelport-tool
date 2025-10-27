import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Zap, Globe, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Free File Converter</h1>
            <p className="text-xl text-muted-foreground">
              Simple, secure, and free file conversion tools for everyone
            </p>
          </div>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              We believe file conversion should be simple, fast, and secure. That's why we built 
              Free File Converter - a completely browser-based solution that respects your privacy 
              and doesn't require any downloads or signups.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">100% Private</h3>
                  <p className="text-sm text-muted-foreground">
                    All conversions happen in your browser. No uploads, no storage, complete privacy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    Client-side processing means instant conversions with no server delays.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Works Everywhere</h3>
                  <p className="text-sm text-muted-foreground">
                    No installation required. Works on any device with a modern browser.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Always Free</h3>
                  <p className="text-sm text-muted-foreground">
                    No hidden costs, no premium plans, no credit card required.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Technology</h2>
            <p className="text-muted-foreground">
              We use modern web technologies to perform all conversions directly in your browser. 
              This means your files never leave your device, ensuring maximum privacy and speed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
