import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Upload, FileText, Link as LinkIcon, X } from "lucide-react";
import { convertImagesToPdf, downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function ImageToPdf() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviewUrls(files.map(file => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
    setPreviewUrls(urls => urls.filter((_, i) => i !== index));
  };

  const handleDownload = async () => {
    if (selectedFiles.length === 0) return;
    try {
      const blob = await convertImagesToPdf(selectedFiles);
      downloadFile(blob, "images.pdf");
      toast.success("Images converted to PDF successfully!");
    } catch (error) {
      toast.error("Failed to convert images to PDF");
    }
  };

  const relatedTools = [
    { name: "JPG to PDF", path: "/jpg-to-pdf" },
    { name: "PNG to PDF", path: "/png-to-pdf" },
    { name: "PDF to Image", path: "/pdf-to-image" },
    { name: "Compress PDF", path: "/compress-pdf" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Image to PDF Converter Online | Convert Images to PDF | ConvertAny</title>
        <meta name="description" content="Convert multiple images to PDF online for free. Combine JPG, PNG, and other images into one PDF file." />
        <meta name="keywords" content="image to pdf, convert images to pdf, jpg to pdf, png to pdf, combine images pdf" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Image to PDF Converter
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {selectedFiles.length === 0 ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload images to convert to PDF</p>
                    <p className="text-sm text-muted-foreground mb-4">You can select multiple images</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Images
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Label>Selected Images ({selectedFiles.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative border rounded-lg p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <img src={url} alt={`Image ${index + 1}`} className="w-full rounded" />
                          <p className="text-xs text-center mt-2">{selectedFiles[index].name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        id="add-more"
                      />
                      <Button variant="outline" asChild>
                        <label htmlFor="add-more" className="cursor-pointer">
                          Add More
                        </label>
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
