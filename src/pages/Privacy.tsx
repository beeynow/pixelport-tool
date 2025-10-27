import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Privacy Matters</h2>
            <p className="text-muted-foreground">
              At Free File Converter, we are committed to protecting your privacy. We designed our service 
              with privacy as a core principle.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Collection & Storage</h2>
            <p className="text-muted-foreground">
              <strong>We do not collect, store, or process your files.</strong> All file conversions happen 
              directly in your browser using client-side JavaScript. Your files never leave your device.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">File Deletion</h2>
            <p className="text-muted-foreground">
              Since files are processed entirely in your browser, there is nothing to delete from our servers. 
              Once you close or refresh your browser, all temporary data is automatically cleared.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cookies & Tracking</h2>
            <p className="text-muted-foreground">
              We do not use cookies or tracking technologies. We do not collect personal information, 
              IP addresses, or browsing behavior.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            <p className="text-muted-foreground">
              Our service operates independently and does not share data with third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about our privacy practices, please contact us.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
