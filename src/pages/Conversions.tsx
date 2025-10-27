import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { Upload, FileText, Image as ImageIcon, Film, Music, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  convertPdfToWord,
  convertWordToPdf,
  convertPdfToExcel,
  convertImageFormat,
  convertMarkdownToHtml,
  convertImageToSvg,
  convertVideoToAudio,
  convertPdfToPowerPoint,
  downloadFile,
  convertImagesToPdf,
  convertExcelToCsv,
  convertCsvToExcel,
  convertTextToPdf,
  mergePdfs,
  splitPdf,
  compressImage,
} from "@/lib/conversions";

type ConversionType = {
  id: string;
  name: string;
  description: string;
  acceptedFiles: string;
  multipleFiles?: boolean;
  handler: (files: File[]) => Promise<void>;
};

export default function ConversionsNew() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const conversions: ConversionType[] = [
    {
      id: "pdf-to-word",
      name: "PDF to Word",
      description: "Convert PDF to editable DOCX",
      acceptedFiles: ".pdf",
      handler: async (files) => {
        const blob = await convertPdfToWord(files[0]);
        downloadFile(blob, 'converted.docx');
      }
    },
    {
      id: "word-to-pdf",
      name: "Word to PDF",
      description: "Convert DOCX to PDF",
      acceptedFiles: ".docx,.doc",
      handler: async (files) => {
        const blob = await convertWordToPdf(files[0]);
        downloadFile(blob, 'converted.pdf');
      }
    },
    {
      id: "pdf-to-excel",
      name: "PDF to Excel",
      description: "Extract tables to XLSX",
      acceptedFiles: ".pdf",
      handler: async (files) => {
        const blob = await convertPdfToExcel(files[0]);
        downloadFile(blob, 'converted.xlsx');
      }
    },
    {
      id: "image-to-pdf",
      name: "Image to PDF",
      description: "Convert images to PDF",
      acceptedFiles: "image/*",
      multipleFiles: true,
      handler: async (files) => {
        const blob = await convertImagesToPdf(files);
        downloadFile(blob, 'images.pdf');
      }
    },
    {
      id: "jpg-to-png",
      name: "Image Format",
      description: "Convert image formats",
      acceptedFiles: "image/*",
      handler: async (files) => {
        const blob = await convertImageFormat(files[0], 'png');
        downloadFile(blob, 'converted.png');
      }
    },
    {
      id: "compress-image",
      name: "Compress Image",
      description: "Reduce image file size",
      acceptedFiles: "image/*",
      handler: async (files) => {
        const blob = await compressImage(files[0], 0.7);
        downloadFile(blob, 'compressed.jpg');
      }
    },
    {
      id: "video-to-audio",
      name: "Video to MP3",
      description: "Extract audio from video",
      acceptedFiles: "video/*",
      handler: async (files) => {
        const blob = await convertVideoToAudio(files[0]);
        downloadFile(blob, 'audio.mp3');
      }
    },
    {
      id: "merge-pdf",
      name: "Merge PDFs",
      description: "Combine PDF files",
      acceptedFiles: ".pdf",
      multipleFiles: true,
      handler: async (files) => {
        const blob = await mergePdfs(files);
        downloadFile(blob, 'merged.pdf');
      }
    }
  ];

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setCompleted(false);
    }
  }, []);

  const handleConvert = useCallback(async (conversion: ConversionType) => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive"
      });
      return;
    }

    setConverting(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      await conversion.handler(selectedFiles);

      clearInterval(progressInterval);
      setProgress(100);
      setCompleted(true);

      toast({
        title: "Conversion complete!",
        description: "Your file has been downloaded and permanently deleted from our servers.",
      });

      // Reset after showing success
      setTimeout(() => {
        setSelectedFiles([]);
        setProgress(0);
        setCompleted(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error converting your file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setConverting(false);
    }
  }, [selectedFiles, toast]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Free Online File Converter
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Upload your file, select format, and convert instantly. All conversions happen securely in your browser.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Area */}
          <Card className="border-2 border-dashed hover:border-primary/50 transition-all">
            <CardContent className="p-12">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                    <Upload className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : "Drag & Drop or Click to Upload"}
                    </h3>
                    {selectedFiles.length > 0 && (
                      <div className="space-y-2 mt-4">
                        {selectedFiles.map((file, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                            <span className="font-semibold">{file.name}</span>
                            <span className="mx-2">•</span>
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedFiles.length === 0 && (
                      <p className="text-muted-foreground">
                        All formats supported • Maximum 100MB per file
                      </p>
                    )}
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  multiple
                />
              </label>
            </CardContent>
          </Card>

          {/* Conversion Progress */}
          {converting && (
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <p className="text-lg font-semibold">Converting your file...</p>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-center text-sm text-muted-foreground">{progress}% complete</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Message */}
          {completed && (
            <Card className="border-2 border-primary/50 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 text-primary">
                  <CheckCircle2 className="w-8 h-8" />
                  <div>
                    <p className="text-lg font-semibold">File downloaded successfully!</p>
                    <p className="text-sm text-muted-foreground">Your file has been securely removed from our system</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conversion Options */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Select Conversion Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conversions.map((conversion) => (
                  <Button
                    key={conversion.id}
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => handleConvert(conversion)}
                    disabled={converting || selectedFiles.length === 0}
                  >
                    <span className="font-semibold text-lg">{conversion.name}</span>
                    <span className="text-sm text-muted-foreground">{conversion.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="bg-muted/50">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                🔒 <strong>100% Private & Secure:</strong> All conversions happen in your browser. 
                Files are never uploaded to servers and are permanently deleted after download.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
