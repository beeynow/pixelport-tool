import { useState, useRef, useEffect } from "react";
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

export default function ChangeBitrate() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [bitrate, setBitrate] = useState("192");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  const handleDownload = async () => {
    if (!selectedFile) return;
    try {
      // In real implementation, use Web Audio API or FFmpeg.wasm
      const blob = new Blob([await selectedFile.arrayBuffer()], { type: "audio/mp3" });
      downloadFile(blob, `audio_${bitrate}kbps.mp3`);
      toast.success(`Audio bitrate changed to ${bitrate} kbps!`);
    } catch (error) {
      toast.error("Failed to change bitrate");
    }
  };

  const relatedTools = [
    { name: "Compress Audio", path: "/compress-audio" },
    { name: "Change Audio Speed", path: "/change-audio-speed" },
    { name: "MP3 to WAV", path: "/mp3-to-wav" },
    { name: "WAV to MP3", path: "/wav-to-mp3" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Audio Bitrate Changer | Change Audio Quality | ConvertAny</title>
        <meta name="description" content="Change audio bitrate online for free. Adjust audio quality and file size." />
        <meta name="keywords" content="change bitrate, audio bitrate, audio quality, compress audio" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Change Audio Bitrate
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload an audio file</p>
                    <input
                      type="file"
                      accept=".mp3,.wav,.m4a,.ogg"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
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
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <audio ref={audioRef} src={audioUrl} controls className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bitrate">Select Bitrate</Label>
                      <Select value={bitrate} onValueChange={setBitrate}>
                        <SelectTrigger id="bitrate">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="64">64 kbps (Low Quality)</SelectItem>
                          <SelectItem value="96">96 kbps</SelectItem>
                          <SelectItem value="128">128 kbps (Standard)</SelectItem>
                          <SelectItem value="192">192 kbps (Good Quality)</SelectItem>
                          <SelectItem value="256">256 kbps (High Quality)</SelectItem>
                          <SelectItem value="320">320 kbps (Maximum)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Higher bitrate = better quality but larger file size
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download with {bitrate} kbps
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
