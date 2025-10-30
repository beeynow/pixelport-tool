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
    const existingScript = document.querySelector(
      'script[src*="adsbygoogle.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("data-ad-client", "ca-pub-7858868028312077");
      document.head.appendChild(script);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Free Online File Converter - Convert PDF, Images, Audio & Video |
          ConvertMe
        </title>
        <meta
          name="description"
          content="Free online file converter: Convert PDF to Word, JPG to PNG, MP4 to MP3, and 60+ formats. No signup required. Fast, secure, 100% free forever."
        />
        <meta
          name="keywords"
          content="free file converter, online converter, PDF to Word, image converter, video converter, audio converter, JPG to PNG, MP4 to MP3, free PDF converter, online file conversion"
        />
        <link rel="canonical" href="https://convertme.app" />
        <meta
          property="og:title"
          content="Free Online File Converter - ConvertMe"
        />
        <meta
          property="og:description"
          content="Convert files online free. PDF, images, audio & video. No signup, always free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://convertme.app" />
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
            style={{ display: "block", width: "100%", height: 50 }}
            data-ad-client="ca-pub-7858868028312077"
            data-ad-slot="3376852857"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default Index;
