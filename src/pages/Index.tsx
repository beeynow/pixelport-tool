import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularConversions from "@/components/PopularConversions";
import QuickUpload from "@/components/QuickUpload";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  useEffect(() => {
    // Check if AdSense script is already on the page
    const existingScript = document.querySelector(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );

    // If not present, inject it
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6746133241342087";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Trigger ad load
    const timeout = setTimeout(() => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense load error:", e);
      }
    }, 500);

    // Cleanup
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet>
        <title>Free Online File Converter – Convert Documents, Images & Videos | ConvertAny</title>
        <meta name="description" content="ConvertAny.site is a 100% free online file converter. Convert PDF to Word, JPG to PNG, MP4 to MP3, and 60+ formats. No signup required. Fast, secure, 100% free forever." />
        <meta name="keywords" content="free file converter, online converter, PDF to Word, image converter, video converter, audio converter, JPG to PNG, MP4 to MP3, free PDF converter, online file conversion, convertany" />
        <link rel="canonical" href="https://convertany.site/" />
        <meta property="og:title" content="Free Online File Converter - ConvertAny.site" />
        <meta property="og:description" content="Convert files online free. PDF, images, audio & video. 60+ formats. No signup, always free." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertany.site/" />
        <meta property="og:image" content="https://convertany.site/assets/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <PopularConversions />
        <QuickUpload />
        <HowItWorks />
        <Features />
        <TrustSection />
        {/* ✅ AdSense block */}
        <div className="my-10 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "inline-block", width: "600px", height: "50px" }}
            data-ad-client="ca-pub-6746133241342087"
            data-ad-slot="4334657400"
          ></ins>
        </div>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default Index;
