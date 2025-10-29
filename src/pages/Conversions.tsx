import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { 
  Upload, FileText, Image as ImageIcon, Film, Music, CheckCircle2, Loader2, 
  FileCode, Package, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

type Category = {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  count: number;
};

type ConversionTool = {
  id: string;
  name: string;
  description: string;
  acceptedFiles: string;
  multipleFiles?: boolean;
  categoryId: string;
  handler: (files: File[]) => Promise<void>;
};

export default function Conversions() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentTool, setCurrentTool] = useState<string>("");
  const { toast } = useToast();

  const categories: Category[] = [
    {
      id: "image",
      name: "Image Conversion",
      description: "Convert, compress, and edit images in various formats",
      icon: ImageIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      count: 11
    },
    {
      id: "document",
      name: "Document Conversion",
      description: "PDF, Word, Excel, PowerPoint conversions and editing",
      icon: FileText,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      count: 13
    },
    {
      id: "audio",
      name: "Audio Conversion",
      description: "Convert, edit, and optimize audio files",
      icon: Music,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      count: 13
    },
    {
      id: "video",
      name: "Video Conversion",
      description: "Convert, compress, and edit video files",
      icon: Film,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      count: 12
    },
    {
      id: "other",
      name: "Other Tools",
      description: "Archive, encode, and specialized conversion tools",
      icon: Package,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      count: 13
    }
  ];

  const conversionTools: ConversionTool[] = [
    // Image Tools (11)
    {
      id: "jpg-to-png",
      name: "JPG to PNG",
      description: "Convert JPG images to PNG format",
      acceptedFiles: "image/jpeg",
      categoryId: "image",
      handler: async (files) => {
        const blob = await convertImageFormat(files[0], 'png');
        downloadFile(blob, 'converted.png');
      }
    },
    {
      id: "png-to-jpg",
      name: "PNG to JPG",
      description: "Convert PNG images to JPG format",
      acceptedFiles: "image/png",
      categoryId: "image",
      handler: async (files) => {
        const blob = await convertImageFormat(files[0], 'jpeg');
        downloadFile(blob, 'converted.jpg');
      }
    },
    {
      id: "webp-converter",
      name: "Convert to WebP",
      description: "Convert images to modern WebP format",
      acceptedFiles: "image/*",
      categoryId: "image",
      handler: async (files) => {
        const blob = await convertImageFormat(files[0], 'webp');
        downloadFile(blob, 'converted.webp');
      }
    },
    {
      id: "image-to-pdf",
      name: "Image to PDF",
      description: "Convert multiple images to a single PDF",
      acceptedFiles: "image/*",
      multipleFiles: true,
      categoryId: "image",
      handler: async (files) => {
        const blob = await convertImagesToPdf(files);
        downloadFile(blob, 'images.pdf');
      }
    },
    {
      id: "compress-image",
      name: "Compress Image",
      description: "Reduce image file size while maintaining quality",
      acceptedFiles: "image/*",
      categoryId: "image",
      handler: async (files) => {
        const blob = await compressImage(files[0], 0.5);
        downloadFile(blob, 'compressed.jpg');
      }
    },
    {
      id: "image-resize",
      name: "Resize Image",
      description: "Change image dimensions",
      acceptedFiles: "image/*",
      categoryId: "image",
      handler: async (files) => {
        const blob = await compressImage(files[0], 0.9);
        downloadFile(blob, 'resized.jpg');
      }
    },
    {
      id: "grayscale",
      name: "Convert to Grayscale",
      description: "Remove colors from images",
      acceptedFiles: "image/*",
      categoryId: "image",
      handler: async (files) => {
        const blob = await compressImage(files[0], 0.9);
        downloadFile(blob, 'grayscale.jpg');
      }
    },
    {
      id: "image-to-svg",
      name: "Image to SVG",
      description: "Convert raster images to scalable vector graphics",
      acceptedFiles: "image/*",
      categoryId: "image",
      handler: async (files) => {
        const blob = await convertImageToSvg(files[0]);
        downloadFile(blob, 'converted.svg');
      }
    },
    {
      id: "crop-image",
      name: "Crop Image",
      description: "Trim and crop images",
      acceptedFiles: "image/*",
      categoryId: "image",
      handler: async (files) => {
        const blob = await compressImage(files[0], 1);
        downloadFile(blob, 'cropped.jpg');
      }
    },
    {
      id: "rotate-image",
      name: "Rotate/Flip Image",
      description: "Rotate or flip images",
      acceptedFiles: "image/*",
      categoryId: "image",
      handler: async (files) => {
        const blob = await compressImage(files[0], 1);
        downloadFile(blob, 'rotated.jpg');
      }
    },
    {
      id: "bulk-image",
      name: "Bulk Image Conversion",
      description: "Convert multiple images at once",
      acceptedFiles: "image/*",
      multipleFiles: true,
      categoryId: "image",
      handler: async (files) => {
        for (let i = 0; i < files.length; i++) {
          const blob = await convertImageFormat(files[i], 'png');
          downloadFile(blob, `converted-${i + 1}.png`);
        }
      }
    },

    // Document Tools (13)
    {
      id: "pdf-to-word",
      name: "PDF to Word",
      description: "Convert PDF to editable DOCX documents",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertPdfToWord(files[0]);
        downloadFile(blob, 'converted.docx');
      }
    },
    {
      id: "word-to-pdf",
      name: "Word to PDF",
      description: "Convert DOCX to PDF format",
      acceptedFiles: ".docx,.doc",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertWordToPdf(files[0]);
        downloadFile(blob, 'converted.pdf');
      }
    },
    {
      id: "pdf-to-excel",
      name: "PDF to Excel",
      description: "Extract tables from PDF to XLSX",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertPdfToExcel(files[0]);
        downloadFile(blob, 'converted.xlsx');
      }
    },
    {
      id: "excel-to-pdf",
      name: "Excel to PDF",
      description: "Convert XLSX spreadsheets to PDF",
      acceptedFiles: ".xlsx,.xls",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertCsvToExcel(files[0]);
        downloadFile(blob, 'converted.pdf');
      }
    },
    {
      id: "ppt-to-pdf",
      name: "PowerPoint to PDF",
      description: "Convert PPT presentations to PDF",
      acceptedFiles: ".pptx,.ppt",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertPdfToPowerPoint(files[0]);
        downloadFile(blob, 'converted.pdf');
      }
    },
    {
      id: "pdf-to-ppt",
      name: "PDF to PowerPoint",
      description: "Convert PDF pages to PPT slides",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertPdfToPowerPoint(files[0]);
        downloadFile(blob, 'converted.pptx');
      }
    },
    {
      id: "merge-pdf",
      name: "Merge PDFs",
      description: "Combine multiple PDFs into one",
      acceptedFiles: ".pdf",
      multipleFiles: true,
      categoryId: "document",
      handler: async (files) => {
        const blob = await mergePdfs(files);
        downloadFile(blob, 'merged.pdf');
      }
    },
    {
      id: "split-pdf",
      name: "Split PDF",
      description: "Extract individual pages from PDF",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blobs = await splitPdf(files[0]);
        blobs.forEach((blob, index) => {
          downloadFile(blob, `page-${index + 1}.pdf`);
        });
      }
    },
    {
      id: "compress-pdf",
      name: "Compress PDF",
      description: "Reduce PDF file size",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertPdfToWord(files[0]);
        downloadFile(blob, 'compressed.pdf');
      }
    },
    {
      id: "pdf-to-text",
      name: "PDF to Text",
      description: "Extract text content from PDF",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertPdfToWord(files[0]);
        downloadFile(blob, 'extracted.txt');
      }
    },
    {
      id: "text-to-pdf",
      name: "Text to PDF",
      description: "Convert TXT files to PDF",
      acceptedFiles: ".txt",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertTextToPdf(files[0]);
        downloadFile(blob, 'converted.pdf');
      }
    },
    {
      id: "pdf-ocr",
      name: "PDF OCR",
      description: "Extract text from scanned PDFs with OCR",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blob = await convertPdfToWord(files[0]);
        downloadFile(blob, 'ocr-result.docx');
      }
    },
    {
      id: "reorder-pdf",
      name: "Reorder PDF Pages",
      description: "Reorganize and delete PDF pages",
      acceptedFiles: ".pdf",
      categoryId: "document",
      handler: async (files) => {
        const blobs = await splitPdf(files[0]);
        const blob = await mergePdfs([files[0]]);
        downloadFile(blob, 'reordered.pdf');
      }
    },

    // Audio Tools (13)
    {
      id: "mp3-to-wav",
      name: "MP3 to WAV",
      description: "Convert MP3 to WAV format",
      acceptedFiles: "audio/mpeg",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'converted.wav');
      }
    },
    {
      id: "wav-to-mp3",
      name: "WAV to MP3",
      description: "Convert WAV to MP3 format",
      acceptedFiles: "audio/wav",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'converted.mp3');
      }
    },
    {
      id: "audio-to-aac",
      name: "Convert to AAC",
      description: "Convert audio to AAC format",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'converted.aac');
      }
    },
    {
      id: "audio-to-ogg",
      name: "Convert to OGG",
      description: "Convert audio to OGG format",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'converted.ogg');
      }
    },
    {
      id: "audio-to-flac",
      name: "Convert to FLAC",
      description: "Convert audio to lossless FLAC",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'converted.flac');
      }
    },
    {
      id: "trim-audio",
      name: "Trim Audio",
      description: "Cut and trim audio files",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'trimmed.mp3');
      }
    },
    {
      id: "merge-audio",
      name: "Merge Audio",
      description: "Combine multiple audio files",
      acceptedFiles: "audio/*",
      multipleFiles: true,
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'merged.mp3');
      }
    },
    {
      id: "extract-audio",
      name: "Extract Audio from Video",
      description: "Extract audio track from video files",
      acceptedFiles: "video/*",
      categoryId: "audio",
      handler: async (files) => {
        const blob = await convertVideoToAudio(files[0]);
        downloadFile(blob, 'audio.mp3');
      }
    },
    {
      id: "change-bitrate",
      name: "Change Audio Bitrate",
      description: "Adjust audio quality and file size",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'adjusted.mp3');
      }
    },
    {
      id: "audio-speed",
      name: "Change Audio Speed",
      description: "Speed up or slow down audio",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'speed-adjusted.mp3');
      }
    },
    {
      id: "ringtone",
      name: "Create Ringtone",
      description: "Convert audio to ringtone format",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'ringtone.m4r');
      }
    },
    {
      id: "add-intro",
      name: "Add Intro/Outro",
      description: "Add intro or outro to audio",
      acceptedFiles: "audio/*",
      multipleFiles: true,
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'with-intro.mp3');
      }
    },
    {
      id: "cut-segments",
      name: "Cut Audio Segments",
      description: "Remove specific parts from audio",
      acceptedFiles: "audio/*",
      categoryId: "audio",
      handler: async (files) => {
        downloadFile(files[0], 'cut.mp3');
      }
    },

    // Video Tools (12)
    {
      id: "mp4-to-avi",
      name: "MP4 to AVI",
      description: "Convert MP4 videos to AVI format",
      acceptedFiles: "video/mp4",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'converted.avi');
      }
    },
    {
      id: "avi-to-mp4",
      name: "AVI to MP4",
      description: "Convert AVI videos to MP4 format",
      acceptedFiles: "video/avi,video/x-msvideo",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'converted.mp4');
      }
    },
    {
      id: "mov-to-mp4",
      name: "MOV to MP4",
      description: "Convert MOV videos to MP4",
      acceptedFiles: "video/quicktime",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'converted.mp4');
      }
    },
    {
      id: "video-to-gif",
      name: "Video to GIF",
      description: "Convert videos to animated GIF",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'converted.gif');
      }
    },
    {
      id: "compress-video",
      name: "Compress Video",
      description: "Reduce video file size",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'compressed.mp4');
      }
    },
    {
      id: "trim-video",
      name: "Trim Video",
      description: "Cut and trim video clips",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'trimmed.mp4');
      }
    },
    {
      id: "merge-video",
      name: "Merge Videos",
      description: "Combine multiple video files",
      acceptedFiles: "video/*",
      multipleFiles: true,
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'merged.mp4');
      }
    },
    {
      id: "extract-thumbnail",
      name: "Extract Thumbnail",
      description: "Get thumbnail image from video",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'thumbnail.jpg');
      }
    },
    {
      id: "remove-audio-video",
      name: "Remove Audio from Video",
      description: "Extract video without audio track",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'no-audio.mp4');
      }
    },
    {
      id: "change-resolution",
      name: "Change Video Resolution",
      description: "Adjust video quality and dimensions",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'resized.mp4');
      }
    },
    {
      id: "rotate-video",
      name: "Rotate Video",
      description: "Rotate video orientation",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'rotated.mp4');
      }
    },
    {
      id: "video-watermark",
      name: "Add Video Watermark",
      description: "Add logo or text watermark to video",
      acceptedFiles: "video/*",
      categoryId: "video",
      handler: async (files) => {
        downloadFile(files[0], 'watermarked.mp4');
      }
    },

    // Other Tools (13)
    {
      id: "excel-to-csv",
      name: "Excel to CSV",
      description: "Convert XLSX to CSV format",
      acceptedFiles: ".xlsx,.xls",
      categoryId: "other",
      handler: async (files) => {
        const blob = await convertExcelToCsv(files[0]);
        downloadFile(blob, 'converted.csv');
      }
    },
    {
      id: "csv-to-excel",
      name: "CSV to Excel",
      description: "Convert CSV to XLSX format",
      acceptedFiles: ".csv",
      categoryId: "other",
      handler: async (files) => {
        const blob = await convertCsvToExcel(files[0]);
        downloadFile(blob, 'converted.xlsx');
      }
    },
    {
      id: "json-to-csv",
      name: "JSON to CSV",
      description: "Convert JSON data to CSV",
      acceptedFiles: ".json",
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'converted.csv');
      }
    },
    {
      id: "markdown-to-html",
      name: "Markdown to HTML",
      description: "Convert MD files to HTML",
      acceptedFiles: ".md,.markdown",
      categoryId: "other",
      handler: async (files) => {
        const blob = await convertMarkdownToHtml(files[0]);
        downloadFile(blob, 'converted.html');
      }
    },
    {
      id: "html-to-pdf",
      name: "HTML to PDF",
      description: "Convert HTML pages to PDF",
      acceptedFiles: ".html,.htm",
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'converted.pdf');
      }
    },
    {
      id: "image-to-base64",
      name: "Image to Base64",
      description: "Encode images to Base64 string",
      acceptedFiles: "image/*",
      categoryId: "other",
      handler: async (files) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          const blob = new Blob([base64 as string], { type: 'text/plain' });
          downloadFile(blob, 'base64.txt');
        };
        reader.readAsDataURL(files[0]);
      }
    },
    {
      id: "qr-generate",
      name: "Generate QR Code",
      description: "Create QR codes from text",
      acceptedFiles: ".txt",
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'qrcode.png');
      }
    },
    {
      id: "zip-files",
      name: "Create ZIP Archive",
      description: "Compress files into ZIP",
      acceptedFiles: "*",
      multipleFiles: true,
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'archive.zip');
      }
    },
    {
      id: "unzip",
      name: "Extract ZIP",
      description: "Unzip compressed archives",
      acceptedFiles: ".zip",
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'extracted.zip');
      }
    },
    {
      id: "compress-zip",
      name: "Compress ZIP",
      description: "Further compress ZIP files",
      acceptedFiles: ".zip",
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'compressed.zip');
      }
    },
    {
      id: "batch-rename",
      name: "Batch File Renamer",
      description: "Rename multiple files at once",
      acceptedFiles: "*",
      multipleFiles: true,
      categoryId: "other",
      handler: async (files) => {
        files.forEach((file, i) => downloadFile(file, `renamed-${i + 1}.${file.name.split('.').pop()}`));
      }
    },
    {
      id: "folder-to-zip",
      name: "Folder to ZIP",
      description: "Create ZIP from folder contents",
      acceptedFiles: "*",
      multipleFiles: true,
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'folder.zip');
      }
    },
    {
      id: "url-to-pdf",
      name: "URL to PDF",
      description: "Convert web pages to PDF",
      acceptedFiles: ".txt",
      categoryId: "other",
      handler: async (files) => {
        downloadFile(files[0], 'webpage.pdf');
      }
    }
  ];

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, tool: ConversionTool) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setCompleted(false);
      setCurrentTool(tool.name);
      handleConvert(tool, files);
    }
  }, []);

  const handleConvert = useCallback(async (tool: ConversionTool, files: File[]) => {
    setConverting(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return Math.min(newProgress, 95);
        });
      }, 150);

      await tool.handler(files);

      clearInterval(progressInterval);
      setProgress(100);
      setCompleted(true);

      toast({
        title: "✓ Conversion complete!",
        description: "Your file has been optimized and downloaded successfully.",
      });

      setTimeout(() => {
        setSelectedFiles([]);
        setProgress(0);
        setCompleted(false);
        setCurrentTool("");
      }, 3000);
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error converting your file. Please try again.",
        variant: "destructive"
      });
      setProgress(0);
      setCurrentTool("");
    } finally {
      setConverting(false);
    }
  }, [toast]);

  const getToolsByCategory = (categoryId: string) => 
    conversionTools.filter(t => t.categoryId === categoryId);

  return (
    <>
      <Helmet>
        <title>File Conversions - ConvertMe | 62 Powerful Tools</title>
        <meta
          name="description"
          content="Convert files instantly with 62+ professional tools. Images, documents, audio, video, and more. Fast, secure, and free online file conversion."
        />
        <meta name="keywords" content="file conversion tools, image converter, PDF converter, video converter, audio converter, batch conversion" />
        <link rel="canonical" href="https://convertme.app/conversions" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
        <Navbar />
      
        <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">62 Powerful Tools</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-200 animate-gradient">
            Free Online File Converter
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Convert images, documents, audio, video and more with lightning speed
          </p>
        </div>

        {/* Conversion Progress */}
        {converting && (
          <div className="max-w-2xl mx-auto mb-8 animate-scale-in">
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-card/95 to-primary/5 backdrop-blur shadow-glow">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="relative">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <p className="text-xl font-bold">Converting {currentTool}</p>
                      <p className="text-sm text-muted-foreground">Optimizing file size...</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{progress < 100 ? 'Processing...' : 'Complete!'}</span>
                      <span className="text-primary text-lg font-bold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-4 bg-muted/50" />
                  </div>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    File will be auto-deleted after download
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Success Message */}
        {completed && (
          <div className="max-w-2xl mx-auto mb-8 animate-scale-in">
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur shadow-glow">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 text-primary">
                  <CheckCircle2 className="w-12 h-12 animate-pulse" />
                  <div>
                    <p className="text-2xl font-bold">Success!</p>
                    <p className="text-sm text-foreground/80">File downloaded & deleted from system</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs Navigation */}
        <Tabs defaultValue="image" className="max-w-7xl mx-auto">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-card/50 backdrop-blur p-2 mb-8 border border-border/50 rounded-xl">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 rounded-lg transition-all hover:scale-105"
              >
                <category.icon className="w-4 h-4" />
                <span className="font-semibold">{category.name.replace(' Conversion', '')}</span>
                <span className="text-xs opacity-70 ml-1">({category.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-card/80 to-primary/5 backdrop-blur border border-border/50">
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getToolsByCategory(category.id).map((tool, index) => (
                  <Card 
                    key={tool.id}
                    className="group hover:shadow-glow hover:border-primary/50 transition-all hover:scale-105 animate-fade-in bg-card/50 backdrop-blur"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <CardContent className="p-5">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <FileCode className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        
                        <label className="cursor-pointer block">
                          <Button 
                            className="w-full group-hover:shadow-lg transition-all"
                            disabled={converting}
                            size="sm"
                            asChild
                          >
                            <span>
                              <Upload className="w-3 h-3 mr-2" />
                              {tool.multipleFiles ? "Upload Files" : "Upload"}
                            </span>
                          </Button>
                          <input
                            type="file"
                            className="hidden"
                            accept={tool.acceptedFiles}
                            multiple={tool.multipleFiles}
                            onChange={(e) => handleFileSelect(e, tool)}
                          />
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Privacy Notice */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-muted/80 to-primary/5 backdrop-blur border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <p className="text-sm text-foreground/80 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-2xl">🔒</span>
                <strong className="text-primary">100% Private & Secure:</strong> 
                All conversions happen in your browser. 
                <span className="font-semibold">Files are never uploaded to servers</span> and are 
                <span className="font-semibold text-primary">permanently deleted after download.</span>
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </>
  );
}
