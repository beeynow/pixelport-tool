import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ConversionCard } from "@/components/ConversionCard";
import { FileText, FileImage, FileAudio, FileVideo, FileCode, Sparkles } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Conversions() {
  const [activeTab, setActiveTab] = useState("pdf");

  const handlePdfToWord = async (files: File[]) => {
    const blob = await convertPdfToWord(files[0]);
    downloadFile(blob, 'converted.docx');
  };

  const handleWordToPdf = async (files: File[]) => {
    const blob = await convertWordToPdf(files[0]);
    downloadFile(blob, 'converted.pdf');
  };

  const handlePdfToExcel = async (files: File[]) => {
    const blob = await convertPdfToExcel(files[0]);
    downloadFile(blob, 'converted.xlsx');
  };

  const handleImagesToPdf = async (files: File[]) => {
    const blob = await convertImagesToPdf(files);
    downloadFile(blob, 'images-merged.pdf');
  };

  const handlePdfToPpt = async (files: File[]) => {
    const blob = await convertPdfToPowerPoint(files[0]);
    downloadFile(blob, 'converted.pptx');
  };

  const handleExcelToCsv = async (files: File[]) => {
    const blob = await convertExcelToCsv(files[0]);
    downloadFile(blob, 'converted.csv');
  };

  const handleCsvToExcel = async (files: File[]) => {
    const blob = await convertCsvToExcel(files[0]);
    downloadFile(blob, 'converted.xlsx');
  };

  const handleTextToPdf = async (files: File[]) => {
    const blob = await convertTextToPdf(files[0]);
    downloadFile(blob, 'converted.pdf');
  };

  const handleMarkdownToHtml = async (files: File[]) => {
    const blob = await convertMarkdownToHtml(files[0]);
    downloadFile(blob, 'converted.html');
  };

  const handleImageFormatConversion = async (files: File[]) => {
    const blob = await convertImageFormat(files[0], 'png');
    downloadFile(blob, 'converted.png');
  };

  const handleImageToSvg = async (files: File[]) => {
    const blob = await convertImageToSvg(files[0]);
    downloadFile(blob, 'converted.svg');
  };

  const handleCompressImage = async (files: File[]) => {
    const blob = await compressImage(files[0], 0.7);
    downloadFile(blob, 'compressed.jpg');
  };

  const handleMergePdfs = async (files: File[]) => {
    const blob = await mergePdfs(files);
    downloadFile(blob, 'merged.pdf');
  };

  const handleSplitPdf = async (files: File[]) => {
    const blobs = await splitPdf(files[0]);
    blobs.forEach((blob, index) => {
      downloadFile(blob, `page-${index + 1}.pdf`);
    });
  };

  const handleVideoToAudio = async (files: File[]) => {
    const blob = await convertVideoToAudio(files[0]);
    downloadFile(blob, 'audio.mp3');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Free Online File Converter
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">
            Convert PDF to Word, compress images, convert video to MP3, and more. 
            Professional batch file converter with OCR technology - completely free!
          </p>
          <p className="text-sm text-muted-foreground">
            All conversions happen securely in your browser. No uploads to servers, your files stay private.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="pdf" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-2">
              <FileImage className="w-4 h-4" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger value="document" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Document</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <FileCode className="w-4 h-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-2">
              <FileVideo className="w-4 h-4" />
              <span className="hidden sm:inline">Media</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Free PDF Converter & Editor Online</h2>
              <p className="text-muted-foreground">Convert PDF to Word, Excel, PowerPoint. Merge, split, and compress PDFs for free.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileText}
                title="Free PDF to Word Converter"
                description="Convert PDF files to editable Word DOCX documents online"
                acceptedFiles=".pdf"
                onConvert={handlePdfToWord}
              />
              <ConversionCard
                icon={FileText}
                title="PDF to Excel Converter"
                description="Extract tables from PDFs into Excel spreadsheets with OCR"
                acceptedFiles=".pdf"
                onConvert={handlePdfToExcel}
              />
              <ConversionCard
                icon={FileText}
                title="PDF to PowerPoint"
                description="Convert PDF pages into editable PowerPoint slides"
                acceptedFiles=".pdf"
                onConvert={handlePdfToPpt}
              />
              <ConversionCard
                icon={FileText}
                title="Merge PDFs Online"
                description="Combine multiple PDF files into one document"
                acceptedFiles=".pdf"
                multipleFiles={true}
                onConvert={handleMergePdfs}
              />
              <ConversionCard
                icon={FileText}
                title="Split PDF"
                description="Extract individual pages from a PDF file"
                acceptedFiles=".pdf"
                onConvert={handleSplitPdf}
              />
            </div>
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Free Online Image Converter & Compression Tool</h2>
              <p className="text-muted-foreground">Convert JPG to PNG, compress images, and create PDFs from images. All formats supported.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileImage}
                title="Image to PDF Converter"
                description="Convert JPG, PNG, TIFF images into a single PDF file"
                acceptedFiles="image/*"
                multipleFiles={true}
                onConvert={handleImagesToPdf}
              />
              <ConversionCard
                icon={FileImage}
                title="Convert JPG to PNG"
                description="Free online image format converter: JPG, PNG, WEBP, TIFF"
                acceptedFiles="image/*"
                onConvert={handleImageFormatConversion}
              />
              <ConversionCard
                icon={FileImage}
                title="Image to Vector SVG"
                description="Convert raster images (JPG/PNG) to scalable vector graphics"
                acceptedFiles="image/*"
                onConvert={handleImageToSvg}
              />
              <ConversionCard
                icon={FileImage}
                title="Image Compression Tool Online"
                description="Reduce image file size while maintaining quality - free compressor"
                acceptedFiles="image/*"
                onConvert={handleCompressImage}
              />
            </div>
          </TabsContent>

          <TabsContent value="document" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Document Converter - Word, Text & More</h2>
              <p className="text-muted-foreground">Convert Word to PDF, text to PDF, Markdown to HTML, and EPUB to PDF online for free.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileText}
                title="Convert Word to PDF"
                description="Transform Word DOCX documents to PDF format instantly"
                acceptedFiles=".docx,.doc"
                onConvert={handleWordToPdf}
              />
              <ConversionCard
                icon={FileText}
                title="Text to PDF Converter"
                description="Convert plain TXT files to formatted PDF documents"
                acceptedFiles=".txt"
                onConvert={handleTextToPdf}
              />
              <ConversionCard
                icon={FileCode}
                title="Markdown to HTML"
                description="Convert Markdown (.md) files to HTML web pages"
                acceptedFiles=".md,.markdown"
                onConvert={handleMarkdownToHtml}
              />
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Data File Converter - Excel, CSV & More</h2>
              <p className="text-muted-foreground">Convert Excel to CSV, CSV to Excel, and other spreadsheet formats online.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileCode}
                title="Excel to CSV Converter"
                description="Convert Excel XLSX workbooks to CSV format for data export"
                acceptedFiles=".xlsx,.xls"
                onConvert={handleExcelToCsv}
              />
              <ConversionCard
                icon={FileCode}
                title="CSV to Excel Converter"
                description="Convert CSV data files to Excel XLSX workbooks"
                acceptedFiles=".csv"
                onConvert={handleCsvToExcel}
              />
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Media Converter - Video & Audio Tools</h2>
              <p className="text-muted-foreground">Convert video to MP3, extract audio from videos, and more media conversion tools.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileVideo}
                title="Convert Video to MP3"
                description="Extract audio tracks from MP4, AVI, MOV video files to MP3"
                acceptedFiles="video/*"
                onConvert={handleVideoToAudio}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary animate-glow" />
              <h3 className="text-2xl font-semibold mb-2">Advanced File Conversion Tools Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Audio to text transcription, OCR PDF to text for scanned documents, convert scanned PDF to Word, 
                convert EPUB to PDF for eBooks, and more advanced conversion features are on the way!
              </p>
              <p className="text-sm text-muted-foreground">
                Join our free plan to get notified when these tools launch.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
