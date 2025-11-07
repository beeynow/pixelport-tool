import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Upload, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function Grayscale() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [grayscaleUrl, setGrayscaleUrl] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      applyGrayscale(url);
    }
  };

  const applyGrayscale = async (imageUrl: string) => {
    const img = await loadImage(imageUrl);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    
    ctx.putImageData(imageData, 0, 0);
    setGrayscaleUrl(canvas.toDataURL());
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  };

  const handleDownload = async () => {
    if (!grayscaleUrl) return;
    try {
      const response = await fetch(grayscaleUrl);
      const blob = await response.blob();
      downloadFile(blob, "grayscale.png");
      toast.success("Grayscale image downloaded!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const relatedTools = [
    { name: "Compress Image", path: "/compress-image" },
    { name: "Resize Image", path: "/resize-image" },
    { name: "Crop Image", path: "/crop-image" },
    { name: "Rotate Image", path: "/rotate-image" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Grayscale Converter Online | Convert to Black and White | ConvertAny</title>
        <meta name="description" content="Convert images to grayscale (black and white) online for free. Fast and easy grayscale conversion." />
        <meta name="keywords" content="grayscale converter, black and white, image grayscale, convert to grayscale" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Grayscale Converter
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload an image to convert to grayscale</p>
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
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block">Original</Label>
                        <img src={previewUrl} alt="Original" className="w-full rounded-lg border" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Grayscale</Label>
                        {grayscaleUrl && (
                          <img src={grayscaleUrl} alt="Grayscale" className="w-full rounded-lg border" />
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} disabled={!grayscaleUrl} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Grayscale Image
                      </Button>
                      <Button variant="outline" onClick={() => { setSelectedFile(null); setPreviewUrl(""); setGrayscaleUrl(""); }}>
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
