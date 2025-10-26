import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PopularConversions from "@/components/PopularConversions";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PopularConversions />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
