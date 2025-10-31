import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import {
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Package,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Features() {
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
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense load error:", e);
      }
    }, 500);

    // Cleanup
    return () => clearTimeout(timeout);
  }, []);
  const features = [
    {
      category: "Image Conversion",
      icon: ImageIcon,
      tools: [
        "JPG to PNG",
        "PNG to JPG",
        "WebP Converter",
        "Image to PDF",
        "Compress Image",
        "Resize Image",
        "Grayscale Conversion",
        "Image to SVG",
        "Crop Image",
        "Rotate/Flip Image",
        "Bulk Image Conversion",
      ],
    },
    {
      category: "Document Conversion",
      icon: FileText,
      tools: [
        "PDF to Word",
        "Word to PDF",
        "PDF to Excel",
        "Excel to PDF",
        "PPT to PDF",
        "PDF to PPT",
        "Merge PDFs",
        "Split PDF",
        "Compress PDF",
        "PDF to Text",
        "Text to PDF",
        "PDF OCR",
        "Reorder PDF Pages",
      ],
    },
    {
      category: "Audio Conversion",
      icon: Music,
      tools: [
        "MP3 to WAV",
        "WAV to MP3",
        "Convert to AAC",
        "Convert to OGG",
        "Convert to FLAC",
        "Trim Audio",
        "Merge Audio",
        "Extract Audio from Video",
        "Change Audio Bitrate",
        "Change Audio Speed",
        "Create Ringtone",
        "Add Intro/Outro",
        "Cut Audio Segments",
      ],
    },
    {
      category: "Video Conversion",
      icon: Film,
      tools: [
        "MP4 to AVI",
        "AVI to MP4",
        "MOV to MP4",
        "Video to GIF",
        "Compress Video",
        "Trim Video",
        "Merge Videos",
        "Extract Thumbnail",
        "Remove Audio from Video",
        "Change Video Resolution",
        "Rotate Video",
        "Add Video Watermark",
      ],
    },
    {
      category: "Other Tools",
      icon: Package,
      tools: [
        "Excel to CSV",
        "CSV to Excel",
        "JSON to CSV",
        "Markdown to HTML",
        "HTML to PDF",
        "Image to Base64",
        "Generate QR Code",
        "Create ZIP Archive",
        "Extract ZIP",
        "Compress ZIP",
        "Batch File Renamer",
        "Folder to ZIP",
        "URL to PDF",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>All Features | 62+ Free Conversion Tools | ConvertAny</title>
        <meta
          name="description"
          content="Explore all 62+ free conversion tools on ConvertAny. Convert documents, images, audio, video, and more. No sign-up required."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                All Features
              </h1>
              <p className="text-lg text-muted-foreground">
                62+ powerful conversion tools, completely free
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature) => (
                <Card key={feature.category}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">{feature.category}</h2>
                      <span className="text-sm text-muted-foreground">
                        ({feature.tools.length} tools)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {feature.tools.map((tool) => (
                        <div
                          key={tool}
                          className="p-3 rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          <p className="text-sm font-medium">{tool}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* ✅ AdSense block */}
          <div className="my-10 flex justify-center">
            <ins
              className="adsbygoogle"
              style={{
                display: "inline-block",
                width: "600px",
                height: "50px",
              }}
              data-ad-client="ca-pub-6746133241342087"
              data-ad-slot="4334657400"
            ></ins>
          </div>
          {/* ✅ AdSense block */}
          <div className="my-10 flex justify-center">
            <ins
              className="adsbygoogle"
              style={{
                display: "inline-block",
                width: "600px",
                height: "50px",
              }}
              data-ad-client="ca-pub-6746133241342087"
              data-ad-slot="4334657400"
            ></ins>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
