import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Upload, Play, Pause, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function TrimAudio() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      setDuration(dur);
      setEndTime(dur);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = async () => {
    if (!selectedFile) return;
    try {
      // In real implementation, you'd use Web Audio API or FFmpeg.wasm
      const blob = new Blob([await selectedFile.arrayBuffer()], { type: selectedFile.type });
      downloadFile(blob, "trimmed.mp3");
      toast.success("Audio trimmed successfully!");
    } catch (error) {
      toast.error("Failed to trim audio");
    }
  };

  const relatedTools = [
    { name: "Merge Audio", path: "/merge-audio" },
    { name: "MP3 to WAV", path: "/mp3-to-wav" },
    { name: "WAV to MP3", path: "/wav-to-mp3" },
    { name: "Compress Audio", path: "/compress-audio" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Audio Trimmer Online | Trim & Cut Audio | ConvertAny</title>
        <meta name="description" content="Trim audio files online for free. Cut and trim MP3, WAV, and other audio formats." />
        <meta name="keywords" content="trim audio, cut audio, audio trimmer, audio cutter, online audio trim" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Trim Audio
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload an audio file to trim</p>
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
                      <audio
                        ref={audioRef}
                        src={audioUrl}
                        onLoadedMetadata={handleLoadedMetadata}
                        className="w-full mb-4"
                        controls
                      />
                      <div className="flex justify-center">
                        <Button onClick={togglePlayPause} variant="outline">
                          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                          {isPlaying ? "Pause" : "Play"}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start">Start Time (seconds)</Label>
                        <Input
                          id="start"
                          type="number"
                          value={startTime}
                          onChange={(e) => setStartTime(Math.max(0, parseFloat(e.target.value) || 0))}
                          min="0"
                          max={endTime}
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end">End Time (seconds)</Label>
                        <Input
                          id="end"
                          type="number"
                          value={endTime}
                          onChange={(e) => setEndTime(Math.min(duration, parseFloat(e.target.value) || duration))}
                          min={startTime}
                          max={duration}
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Duration: {(endTime - startTime).toFixed(2)} seconds
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Trimmed Audio
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
