import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import QRCode from "qrcode";

export default function QrGenerate() {
  const [text, setText] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
      toast.success("QR code generated!");
    } catch (error) {
      toast.error("Failed to generate QR code");
    }
  };

  const handleDownload = async () => {
    if (!qrCodeUrl) return;
    const response = await fetch(qrCodeUrl);
    const blob = await response.blob();
    downloadFile(blob, "qr-code.png");
  };

  const relatedTools = [
    { name: "Text to QR", path: "/text-to-qr" },
    { name: "URL Encode", path: "/url-encode" },
    { name: "Hash Generator", path: "/hash-generator" },
    { name: "Text to PDF", path: "/text-to-pdf" },
  ];

  return (
    <>
      <Helmet>
        <title>Free QR Code Generator Online | Create QR Codes | ConvertAny</title>
        <meta name="description" content="Generate QR codes online for free. Create QR codes for text, URLs, and more." />
        <meta name="keywords" content="qr code generator, create qr code, qr code maker, online qr generator" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              QR Code Generator
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="text">Enter Text or URL</Label>
                    <Textarea
                      id="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter text, URL, or any content..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button onClick={handleGenerate} className="w-full">
                    Generate QR Code
                  </Button>

                  {qrCodeUrl && (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <img src={qrCodeUrl} alt="QR Code" className="border rounded-lg p-4 bg-white" />
                      </div>
                      <Button onClick={handleDownload} className="w-full gap-2">
                        <Download className="h-4 w-4" />
                        Download QR Code
                      </Button>
                    </div>
                  )}
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
