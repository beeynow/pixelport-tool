import { Helmet } from "react-helmet";
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
  return (
    <>
      <Helmet>
        <title>ConvertMe - Professional File Conversion Tool | Fast & Free</title>
        <meta
          name="description"
          content="Convert images, documents, audio, and video files instantly. Free online file converter supporting 60+ formats. Fast, secure, and easy to use. No installation required."
        />
        <meta
          name="keywords"
          content="file converter, image converter, PDF converter, audio converter, video converter, online converter, free converter"
        />
        <link rel="canonical" href="https://convertme.app" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <PopularConversions />
        <QuickUpload />
        <HowItWorks />
        <Features />
        <TrustSection />
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default Index;
