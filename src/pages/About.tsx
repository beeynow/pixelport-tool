import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Globe, Heart } from "lucide-react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | ConvertAny.site - Free Online File Converter</title>
        <meta
          name="description"
          content="ConvertAny.site is a free, easy-to-use online file conversion platform built for students, creators, and professionals. Learn about our 62+ conversion tools, privacy-first approach, and mission to make file conversion simple for everyone."
        />
        <meta name="keywords" content="about convertany, file converter platform, free conversion tools, online converter about" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.convertany.site/about" />
        <meta property="og:site_name" content="Convertany" />
        <meta property="og:title" content="About Convertany - Free Online File Converter" />
        <meta property="og:description" content="Learn about Convertany - a free, easy-to-use online file conversion platform with 104+ tools." />
        <meta property="og:url" content="https://www.convertany.site/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Convertany" />
        <meta name="twitter:description" content="Free online file conversion platform with 104+ tools for students, creators, and professionals." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About Convertany
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 mb-12">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Convertany is a free, easy-to-use online file conversion
                platform built for students, creators, and professionals. Our
                mission is to remove barriers to file conversion by offering
                reliable, fast, and completely free tools — no sign-up, no
                limits, and no hidden fees.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                <Card className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    104+ Conversion Tools
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive suite of converters for documents, images,
                    audio, video, and archives.
                  </p>
                </Card>

                <Card className="p-6">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Fast conversion with progress feedback and optimized
                    downloads for all file types.
                  </p>
                </Card>

                <Card className="p-6">
                  <Globe className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                  <p className="text-muted-foreground">
                    No mandatory accounts and minimal data collection. Your
                    files, your privacy.
                  </p>
                </Card>

                <Card className="p-6">
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
                  <p className="text-muted-foreground">
                    Responsive UI for quick conversions on phones, tablets, and
                    desktops.
                  </p>
                </Card>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <h2 className="text-2xl font-bold mb-4">Our Goal</h2>
                <p className="text-muted-foreground mb-4">
                  Our goal is to make converting files simple for everyone. If
                  you have suggestions or want to partner with us, we'd love to
                  hear from you.
                </p>
                <p className="text-muted-foreground">
                  <strong>Contact:</strong>{" "}
                  <a
                    href="mailto:convertany.site@gmail.com"
                    className="text-primary hover:underline"
                  >
                    convertany.site@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
