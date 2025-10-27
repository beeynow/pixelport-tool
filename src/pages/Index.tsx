import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularConversions from "@/components/PopularConversions";
import QuickUpload from "@/components/QuickUpload";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PopularConversions />
      <QuickUpload />
      <HowItWorks />
      <Features />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
