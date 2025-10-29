import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { Shield, Zap, Globe, Heart } from "lucide-react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Free Online File Converter | ConvertMe</title>
        <meta
          name="description"
          content="Learn about ConvertMe - your trusted free online file converter. Convert PDF, images, audio & video files securely in your browser. No signup required."
        />
        <meta name="keywords" content="about file converter, free converter, online conversion tool, secure file converter" />
        <link rel="canonical" href="https://convertme.app/about" />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About Our Free{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Online File Converter
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Free online file conversion tools for everyone - no signup, no limits, always free.
              </p>
            </div>
          
            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground text-lg">
                We provide a free online file converter that's simple, fast, and secure. Convert PDF to Word, 
                compress images, convert audio and video files - all in your browser without any signup. 
                Our mission is to make file conversion accessible to everyone, completely free.
              </p>
              <p className="text-muted-foreground">
                Try our <Link to="/conversions" className="text-primary hover:underline">free PDF converter</Link>, 
                {" "}<Link to="/conversions" className="text-primary hover:underline">image converter</Link>, 
                {" "}and more conversion tools.
              </p>
            </section>

            <section className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold">Why Choose Our Free File Converter?</h2>
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

            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-3xl font-bold">Our Technology</h2>
              <p className="text-muted-foreground text-lg">
                Our free online file converter uses modern web technologies to perform all conversions directly in your browser. 
                This client-side processing means your files never leave your device, ensuring maximum privacy and lightning-fast conversion speeds.
              </p>
              <h3 className="text-xl font-semibold mt-4">Supported Formats</h3>
              <p className="text-muted-foreground">
                Convert between 60+ file formats including PDF, Word, Excel, JPG, PNG, MP3, MP4, and more. 
                Visit our <Link to="/conversions" className="text-primary hover:underline">conversion page</Link> to get started.
              </p>
            </section>

            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="text-muted-foreground text-lg">
                Have questions about our free online file converter? We'd love to hear from you. 
                Visit our <Link to="/contact" className="text-primary hover:underline">contact page</Link> or 
                check our <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>.
              </p>
            </section>
          </div>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}
