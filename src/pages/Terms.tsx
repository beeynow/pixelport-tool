import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By using Free File Converter, you agree to these terms of service. If you do not agree, 
              please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Service Description</h2>
            <p className="text-muted-foreground">
              Free File Converter provides free, browser-based file conversion tools. All processing 
              happens locally in your browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">User Responsibilities</h2>
            <p className="text-muted-foreground">
              You are responsible for the files you convert and must ensure you have the right to 
              convert and use them. Do not use our service for illegal purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Limitations</h2>
            <p className="text-muted-foreground">
              Our service is provided "as is" without warranties. We are not liable for any data loss 
              or damages resulting from the use of our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">File Size & Format Limits</h2>
            <p className="text-muted-foreground">
              Maximum file size is 100MB per file. Some conversions may have additional limitations 
              based on browser capabilities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of the service 
              constitutes acceptance of modified terms.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
