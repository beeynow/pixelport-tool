import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, FileText, Link as LinkIcon } from "lucide-react";
import { convertImageFormat, downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function WebpConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<"png" | "jpeg">("png");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDownload = async () => {
    if (!selectedFile) return;
    try {
      const blob = await convertImageFormat(selectedFile, outputFormat);
      const extension = outputFormat === "jpeg" ? "jpg" : outputFormat;
      downloadFile(blob, `converted.${extension}`);
      toast.success("WebP converted successfully!");
    } catch (error) {
      toast.error("Failed to convert WebP");
    }
  };

  const relatedTools = [
    { name: "WebP to JPG", path: "/webp-to-jpg" },
    { name: "WebP to PNG", path: "/webp-to-png" },
    { name: "JPG to WebP", path: "/jpg-to-webp" },
    { name: "PNG to WebP", path: "/png-to-webp" },
  ];

  return (
    <>
      <Helmet>
        <title>Free WebP Converter Online | Convert WebP Images | ConvertAny</title>
        <meta name="description" content="Convert WebP images to PNG, JPG and other formats online for free. Fast and easy conversion." />
        <meta name="keywords" content="webp converter, convert webp, webp to png, webp to jpg" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              WebP Converter
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload a WebP image to convert</p>
                    <input
                      type="file"
                      accept=".webp"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose WebP File
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block">Original WebP</Label>
                        <img src={previewUrl} alt="Original" className="w-full rounded-lg border" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Convert To</Label>
                        <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpeg">JPG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Converted Image
                      </Button>
                      <Button variant="outline" onClick={() => { setSelectedFile(null); setPreviewUrl(""); }}>
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
