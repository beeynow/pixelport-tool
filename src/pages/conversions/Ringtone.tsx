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

export default function Ringtone() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDownload = async () => {
    if (!selectedFile) return;
    try {
      const blob = new Blob([await selectedFile.arrayBuffer()], { type: "audio/mp3" });
      downloadFile(blob, "ringtone.mp3");
      toast.success("Ringtone created successfully!");
    } catch (error) {
      toast.error("Failed to create ringtone");
    }
  };

  const relatedTools = [
    { name: "Trim Audio", path: "/trim-audio" },
    { name: "Cut Audio Segments", path: "/cut-segments" },
    { name: "Change Audio Speed", path: "/audio-speed" },
    { name: "Merge Audio", path: "/merge-audio" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Ringtone Maker Online | Create Custom Ringtones | ConvertAny</title>
        <meta name="description" content="Create custom ringtones from audio files online for free. Cut and trim audio to make perfect ringtones." />
        <meta name="keywords" content="ringtone maker, create ringtone, custom ringtone, audio to ringtone" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Ringtone Maker
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload an audio file to create a ringtone</p>
                    <input
                      type="file"
                      accept=".mp3,.wav,.m4a,.ogg"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Audio
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="start">Start Time (seconds)</Label>
                        <Input
                          id="start"
                          type="number"
                          min="0"
                          value={startTime}
                          onChange={(e) => setStartTime(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (seconds, max 40)</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          max="40"
                          value={duration}
                          onChange={(e) => setDuration(Math.min(40, Number(e.target.value)))}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Ringtone
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
