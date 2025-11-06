import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Upload, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function ResizeImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (imageUrl && width && height) {
      updatePreview();
    }
  }, [imageUrl, width, height]);

  const updatePreview = async () => {
    if (!canvasRef.current || !imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, width, height);

    setPreviewUrl(canvas.toDataURL("image/jpeg", 0.9));
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspect && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        downloadFile(blob, "resized.jpg");
        toast.success("Image resized successfully!");
      }
    }, "image/jpeg", 0.9);
  };

  const relatedTools = [
    { name: "Compress Image", path: "/compress-image" },
    { name: "JPG to PNG", path: "/jpg-to-png" },
    { name: "PNG to JPG", path: "/png-to-jpg" },
    { name: "Crop Image", path: "/crop-image" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Image Resizer Online | Resize Images | ConvertAny</title>
        <meta name="description" content="Resize images online for free. Fast, secure, and easy image resizing with no sign-up required." />
        <meta name="keywords" content="resize image, image resizer, scale image, resize photo, online image resize" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Resize Image
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg mb-4">Upload an image to start resizing</p>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                          min="1"
                          max="4096"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                          min="1"
                          max="4096"
                          disabled={maintainAspect}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button
                        variant={maintainAspect ? "default" : "outline"}
                        onClick={() => setMaintainAspect(true)}
                      >
                        Maintain Aspect Ratio
                      </Button>
                      <Button
                        variant={!maintainAspect ? "default" : "outline"}
                        onClick={() => setMaintainAspect(false)}
                      >
                        Custom Size
                      </Button>
                    </div>

                    {previewUrl && (
                      <div className="space-y-4">
                        <Label>Preview ({width} × {height})</Label>
                        <div className="border rounded-lg p-4 bg-muted/20 max-h-96 overflow-auto">
                          <img src={previewUrl} alt="Preview" className="max-w-full mx-auto" />
                        </div>
                      </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Resized Image
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
