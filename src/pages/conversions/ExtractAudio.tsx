import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText, Link as LinkIcon } from "lucide-react";
import { convertVideoToAudio, downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function ExtractAudio() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleExtract = async () => {
    if (!selectedFile) return;
    setIsExtracting(true);
    try {
      const blob = await convertVideoToAudio(selectedFile);
      downloadFile(blob, "audio.mp3");
      toast.success("Audio extracted successfully!");
    } catch (error) {
      toast.error("Failed to extract audio");
    } finally {
      setIsExtracting(false);
    }
  };

  const relatedTools = [
    { name: "MP4 to MP3", path: "/mp4-to-mp3" },
    { name: "Trim Audio", path: "/trim-audio" },
    { name: "Merge Audio", path: "/merge-audio" },
    { name: "Compress Audio", path: "/compress-audio" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Audio Extractor Online | Extract Audio from Video | ConvertAny</title>
        <meta name="description" content="Extract audio from video files online for free. Convert video to MP3." />
        <meta name="keywords" content="extract audio, video to audio, audio extractor, mp4 to mp3" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Extract Audio from Video
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload a video to extract audio</p>
                    <input
                      type="file"
                      accept=".mp4,.mov,.avi,.mkv,.webm"
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
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <p className="font-semibold mb-3">Video Preview</p>
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        controls
                        className="w-full max-h-96 rounded"
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>The audio will be extracted and saved as MP3 format.</p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleExtract}
                        disabled={isExtracting}
                        className="flex-1 gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {isExtracting ? "Extracting..." : "Extract & Download Audio"}
                      </Button>
                      <Button variant="outline" onClick={() => { setSelectedFile(null); setVideoUrl(""); }}>
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
