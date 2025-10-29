import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Free Online File Converter | ConvertMe</title>
        <meta
          name="description"
          content="ConvertMe Privacy Policy. We don't store your files. All conversions happen in your browser. 100% private and secure free online file converter."
        />
        <meta name="keywords" content="privacy policy, secure file converter, private conversion, no upload converter" />
        <link rel="canonical" href="https://convertme.app/privacy" />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">
                Your privacy is our priority. Free online file conversion with zero data collection.
              </p>
            </div>
          
            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-3xl font-bold">Your Privacy Matters</h2>
              <p className="text-muted-foreground text-lg">
                Our free online file converter is designed with privacy as the core principle. 
                We are committed to protecting your data and ensuring complete privacy for all your file conversions.
              </p>
            </section>

            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold">No Data Collection or Storage</h2>
              <p className="text-muted-foreground text-lg">
                <strong>We do not collect, store, or process your files.</strong> Our free online file converter 
                performs all conversions directly in your browser using client-side JavaScript. Your files never leave your device.
              </p>
              <h3 className="text-xl font-semibold mt-4">How It Works</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Upload files to your browser (not our servers)</li>
                <li>Convert files locally on your device</li>
                <li>Download converted files directly</li>
                <li>All data stays on your computer</li>
              </ul>
            </section>

            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-3xl font-bold">Automatic File Deletion</h2>
              <p className="text-muted-foreground text-lg">
                Since our free online file converter processes everything in your browser, there's nothing to delete from servers. 
                Once you close or refresh your browser, all temporary data is automatically cleared from your device's memory.
              </p>
            </section>

            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-3xl font-bold">Cookie Consent</h2>
              <p className="text-muted-foreground text-lg">
                We use minimal cookies only for your consent preferences. We do not track your behavior, 
                collect personal information, or store IP addresses. Your use of our free online file converter is completely anonymous.
              </p>
            </section>

            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h2 className="text-3xl font-bold">Third-Party Services</h2>
              <p className="text-muted-foreground text-lg">
                Our free online file converter operates independently and does not share data with third parties. 
                We don't use analytics, advertising, or any external tracking services.
              </p>
            </section>

            <section className="space-y-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="text-muted-foreground text-lg">
                If you have questions about our privacy practices, please visit our{" "}
                <Link to="/contact" className="text-primary hover:underline">contact page</Link> or 
                learn more on our <Link to="/about" className="text-primary hover:underline">about page</Link>.
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
