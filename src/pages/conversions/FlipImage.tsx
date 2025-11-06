import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Upload, FlipHorizontal, FlipVertical, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function FlipImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (imageUrl) {
      updatePreview();
    }
  }, [imageUrl, direction]);

  const updatePreview = async () => {
    if (!canvasRef.current || !imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = canvasRef.current;
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (direction === "horizontal") {
      ctx.scale(-1, 1);
    } else {
      ctx.scale(1, -1);
    }
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    setPreviewUrl(canvas.toDataURL("image/jpeg", 0.9));
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        downloadFile(blob, "flipped.jpg");
        toast.success("Image flipped successfully!");
      }
    }, "image/jpeg", 0.9);
  };

  const relatedTools = [
    { name: "Rotate Image", path: "/rotate-image" },
    { name: "Crop Image", path: "/crop-image" },
    { name: "Resize Image", path: "/resize-image" },
    { name: "Compress Image", path: "/compress-image" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Image Flipper Online | Flip Images Horizontally/Vertically | ConvertAny</title>
        <meta name="description" content="Flip images online for free. Fast, secure, and easy image flipping with no sign-up required." />
        <meta name="keywords" content="flip image, mirror image, image flipper, horizontal flip, vertical flip, online image flip" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Flip Image
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg mb-4">Upload an image to start flipping</p>
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
                      <Label>Flip Direction</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={direction === "horizontal" ? "default" : "outline"}
                          onClick={() => setDirection("horizontal")}
                          className="w-full"
                        >
                          <FlipHorizontal className="w-4 h-4 mr-2" />
                          Horizontal
                        </Button>
                        <Button
                          variant={direction === "vertical" ? "default" : "outline"}
                          onClick={() => setDirection("vertical")}
                          className="w-full"
                        >
                          <FlipVertical className="w-4 h-4 mr-2" />
                          Vertical
                        </Button>
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
                        Download Flipped Image
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
