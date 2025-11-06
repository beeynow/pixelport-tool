import { useState, useRef, useEffect } from "react";
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

export default function CropImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<"square" | "16:9" | "4:3" | "original">("square");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ratios = [
    { label: "Square (1:1)", value: "square" },
    { label: "Widescreen (16:9)", value: "16:9" },
    { label: "Standard (4:3)", value: "4:3" },
    { label: "Center Crop", value: "original" },
  ];

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      updatePreview();
    }
  }, [imageUrl, aspectRatio]);

  const updatePreview = async () => {
    if (!canvasRef.current || !imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = canvasRef.current;
    let cropWidth = img.width;
    let cropHeight = img.height;

    if (aspectRatio === "square") {
      cropWidth = cropHeight = Math.min(img.width, img.height);
    } else if (aspectRatio === "16:9") {
      if (img.width / img.height > 16 / 9) {
        cropWidth = img.height * (16 / 9);
        cropHeight = img.height;
      } else {
        cropWidth = img.width;
        cropHeight = img.width * (9 / 16);
      }
    } else if (aspectRatio === "4:3") {
      if (img.width / img.height > 4 / 3) {
        cropWidth = img.height * (4 / 3);
        cropHeight = img.height;
      } else {
        cropWidth = img.width;
        cropHeight = img.width * (3 / 4);
      }
    }

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d")!;
    const offsetX = (img.width - cropWidth) / 2;
    const offsetY = (img.height - cropHeight) / 2;
    ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    setPreviewUrl(canvas.toDataURL("image/jpeg", 0.9));
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        downloadFile(blob, "cropped.jpg");
        toast.success("Image cropped successfully!");
      }
    }, "image/jpeg", 0.9);
  };

  const relatedTools = [
    { name: "Resize Image", path: "/resize-image" },
    { name: "Compress Image", path: "/compress-image" },
    { name: "JPG to PNG", path: "/jpg-to-png" },
    { name: "PNG to JPG", path: "/png-to-jpg" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Image Cropper Online | Crop Images | ConvertAny</title>
        <meta name="description" content="Crop images online for free. Fast, secure, and easy image cropping with no sign-up required." />
        <meta name="keywords" content="crop image, image cropper, trim image, cut image, online image crop" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Crop Image
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg mb-4">Upload an image to start cropping</p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setSelectedFile(file);
                        }}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Choose Image
                        </label>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label>Crop Aspect Ratio</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {ratios.map((ratio) => (
                          <Button
                            key={ratio.value}
                            variant={aspectRatio === ratio.value ? "default" : "outline"}
                            onClick={() => setAspectRatio(ratio.value as any)}
                            className="w-full"
                          >
                            {ratio.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {previewUrl && (
                      <div className="space-y-4">
                        <Label>Preview</Label>
                        <div className="border rounded-lg p-4 bg-muted/20">
                          <img src={previewUrl} alt="Preview" className="max-w-full mx-auto" />
                        </div>
                      </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Cropped Image
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedFile(null)}>
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
