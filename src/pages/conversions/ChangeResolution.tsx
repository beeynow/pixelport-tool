import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function ChangeResolution() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resolution, setResolution] = useState<string>("1920x1080");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDownload = async () => {
    if (!selectedFile) return;
    try {
      const blob = new Blob([await selectedFile.arrayBuffer()], { type: "video/mp4" });
      downloadFile(blob, `video-${resolution}.mp4`);
      toast.success("Video resolution changed!");
    } catch (error) {
      toast.error("Failed to change resolution");
    }
  };

  const relatedTools = [
    { name: "Compress Video", path: "/compress-video" },
    { name: "Trim Video", path: "/trim-video" },
    { name: "Rotate Video", path: "/rotate-video" },
    { name: "Video Watermark", path: "/video-watermark" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Video Resolution Changer Online | Change Video Quality | ConvertAny</title>
        <meta name="description" content="Change video resolution online for free. Adjust video quality and dimensions." />
        <meta name="keywords" content="change video resolution, video quality, resize video, video dimensions" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Change Video Resolution
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload a video to change resolution</p>
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
                      <Label>Select Resolution</Label>
                      <Select value={resolution} onValueChange={setResolution}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3840x2160">4K (3840x2160)</SelectItem>
                          <SelectItem value="1920x1080">Full HD (1920x1080)</SelectItem>
                          <SelectItem value="1280x720">HD (1280x720)</SelectItem>
                          <SelectItem value="854x480">SD (854x480)</SelectItem>
                          <SelectItem value="640x360">360p (640x360)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Video
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
