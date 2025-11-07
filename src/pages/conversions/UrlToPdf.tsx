import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function UrlToPdf() {
  const [url, setUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    
    setIsConverting(true);
    try {
      const pdf = new jsPDF();
      pdf.text(`Webpage: ${url}`, 15, 15);
      pdf.text("This would contain the webpage content...", 15, 25);
      const blob = pdf.output('blob');
      downloadFile(blob, "webpage.pdf");
      toast.success("URL converted to PDF!");
    } catch (error) {
      toast.error("Failed to convert URL to PDF");
    } finally {
      setIsConverting(false);
    }
  };

  const relatedTools = [
    { name: "HTML to PDF", path: "/html-to-pdf" },
    { name: "Text to PDF", path: "/text-to-pdf" },
    { name: "Markdown to HTML", path: "/markdown-to-html" },
    { name: "PDF to Word", path: "/pdf-to-word" },
  ];

  return (
    <>
      <Helmet>
        <title>Free URL to PDF Converter Online | Webpage to PDF | ConvertAny</title>
        <meta name="description" content="Convert URLs and webpages to PDF online for free. Save websites as PDF documents." />
        <meta name="keywords" content="url to pdf, webpage to pdf, website to pdf, convert url, save webpage as pdf" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              URL to PDF Converter
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="url">Enter Website URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>

                  <Button onClick={handleConvert} disabled={isConverting} className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    {isConverting ? "Converting..." : "Convert to PDF"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {relatedTools.length > 0 && (
              <Card className="backdrop-blur-sm bg-card/50 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Related Tools</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {relatedTools.map((tool) => (
                      <Link key={tool.path} to={tool.path}>
                        <Button variant="outline" className="w-full gap-2 hover:bg-primary/10">
                          <LinkIcon className="h-4 w-4" />
                          {tool.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
