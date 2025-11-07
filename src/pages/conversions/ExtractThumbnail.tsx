import { useState } from "react";
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

export default function ExtractThumbnail() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [timestamp, setTimestamp] = useState<number>(0);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await extractThumbnail(file, timestamp);
    }
  };

  const extractThumbnail = async (file: File, time: number) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    
    video.addEventListener("loadeddata", () => {
      video.currentTime = time;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        setThumbnail(canvas.toDataURL());
      }
    });
  };

  const handleDownload = async () => {
    if (!thumbnail) return;
    try {
      const response = await fetch(thumbnail);
      const blob = await response.blob();
      downloadFile(blob, "thumbnail.png");
      toast.success("Thumbnail downloaded!");
    } catch (error) {
      toast.error("Failed to download thumbnail");
    }
  };

  const relatedTools = [
    { name: "Video to GIF", path: "/video-to-gif" },
    { name: "Trim Video", path: "/trim-video" },
    { name: "Compress Video", path: "/compress-video" },
    { name: "Rotate Video", path: "/rotate-video" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Video Thumbnail Extractor Online | Extract Video Thumbnail | ConvertAny</title>
        <meta name="description" content="Extract thumbnails from video files online for free. Capture any frame as an image." />
        <meta name="keywords" content="extract thumbnail, video thumbnail, video to image, capture video frame" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Extract Video Thumbnail
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload a video to extract thumbnail</p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Video
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="timestamp">Timestamp (seconds)</Label>
                      <Input
                        id="timestamp"
                        type="number"
                        min="0"
                        value={timestamp}
                        onChange={(e) => {
                          setTimestamp(Number(e.target.value));
                          if (selectedFile) extractThumbnail(selectedFile, Number(e.target.value));
                        }}
                      />
                    </div>

                    {thumbnail && (
                      <div>
                        <Label className="mb-2 block">Extracted Thumbnail</Label>
                        <img src={thumbnail} alt="Thumbnail" className="w-full rounded-lg border" />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} disabled={!thumbnail} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Thumbnail
                      </Button>
                      <Button variant="outline" onClick={() => { setSelectedFile(null); setThumbnail(""); }}>
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
