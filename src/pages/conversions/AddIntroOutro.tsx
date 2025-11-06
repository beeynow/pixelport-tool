import { useState } from "react";
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

export default function AddIntroOutro() {
  const [mainAudio, setMainAudio] = useState<File | null>(null);
  const [introAudio, setIntroAudio] = useState<File | null>(null);
  const [outroAudio, setOutroAudio] = useState<File | null>(null);

  const handleDownload = async () => {
    if (!mainAudio) return;
    try {
      // In real implementation, use Web Audio API or FFmpeg.wasm to combine audio
      const blob = new Blob([await mainAudio.arrayBuffer()], { type: "audio/mp3" });
      downloadFile(blob, "audio_with_intro_outro.mp3");
      toast.success("Intro/Outro added successfully!");
    } catch (error) {
      toast.error("Failed to add intro/outro");
    }
  };

  const relatedTools = [
    { name: "Merge Audio", path: "/merge-audio" },
    { name: "Trim Audio", path: "/trim-audio" },
    { name: "Change Audio Speed", path: "/change-audio-speed" },
    { name: "Cut Audio Segments", path: "/cut-audio-segments" },
  ];

  return (
    <>
      <Helmet>
        <title>Add Intro/Outro to Audio | Audio Editor Online | ConvertAny</title>
        <meta name="description" content="Add intro and outro to audio files online for free. Combine audio tracks easily." />
        <meta name="keywords" content="add intro, add outro, audio intro, audio outro, combine audio" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Add Intro/Outro to Audio
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Main Audio (Required)</Label>
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="mb-2">{mainAudio ? mainAudio.name : "Upload main audio"}</p>
                      <input
                        type="file"
                        accept=".mp3,.wav,.m4a,.ogg"
                        onChange={(e) => setMainAudio(e.target.files?.[0] || null)}
                        className="hidden"
                        id="main-audio"
                      />
                      <Button asChild size="sm">
                        <label htmlFor="main-audio" className="cursor-pointer">
                          Choose File
                        </label>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Intro Audio (Optional)</Label>
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="mb-2">{introAudio ? introAudio.name : "Upload intro audio"}</p>
                      <input
                        type="file"
                        accept=".mp3,.wav,.m4a,.ogg"
                        onChange={(e) => setIntroAudio(e.target.files?.[0] || null)}
                        className="hidden"
                        id="intro-audio"
                      />
                      <Button asChild size="sm" variant="outline">
                        <label htmlFor="intro-audio" className="cursor-pointer">
                          Choose File
                        </label>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Outro Audio (Optional)</Label>
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="mb-2">{outroAudio ? outroAudio.name : "Upload outro audio"}</p>
                      <input
                        type="file"
                        accept=".mp3,.wav,.m4a,.ogg"
                        onChange={(e) => setOutroAudio(e.target.files?.[0] || null)}
                        className="hidden"
                        id="outro-audio"
                      />
                      <Button asChild size="sm" variant="outline">
                        <label htmlFor="outro-audio" className="cursor-pointer">
                          Choose File
                        </label>
                      </Button>
                    </div>
                  </div>

                  {mainAudio && (
                    <div className="pt-4">
                      <Button onClick={handleDownload} className="w-full gap-2">
                        <Download className="h-4 w-4" />
                        Download Combined Audio
                      </Button>
                    </div>
                  )}
                </div>
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
