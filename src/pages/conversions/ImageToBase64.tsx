import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, FileText, Link as LinkIcon, Copy } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function ImageToBase64() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setBase64(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    toast.success("Base64 copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([base64], { type: "text/plain" });
    downloadFile(blob, "base64.txt");
  };

  const relatedTools = [
    { name: "Base64 Encode", path: "/base64-encode" },
    { name: "Base64 Decode", path: "/base64-decode" },
    { name: "URL Encode", path: "/url-encode" },
    { name: "Hash Generator", path: "/hash-generator" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Image to Base64 Converter Online | Image Base64 Encoder | ConvertAny</title>
        <meta name="description" content="Convert images to Base64 online for free. Encode images to Base64 string." />
        <meta name="keywords" content="image to base64, base64 image, encode image, base64 converter" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Image to Base64 Converter
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload an image to convert to Base64</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Image
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Base64 Output</Label>
                      <Textarea
                        value={base64}
                        readOnly
                        className="min-h-[300px] font-mono text-xs"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleCopy} className="flex-1 gap-2">
                        <Copy className="h-4 w-4" />
                        Copy Base64
                      </Button>
                      <Button onClick={handleDownload} variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" onClick={() => { setSelectedFile(null); setBase64(""); }}>
                        Upload New
                      </Button>
                    </div>
                  </div>
                )}
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
