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
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default Index;
