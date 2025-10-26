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
            File Conversion Tools
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convert between different file formats with ease. All conversions happen securely in your browser.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileText}
                title="PDF to Word"
                description="Convert PDF files to editable Word documents"
                acceptedFiles=".pdf"
                onConvert={handlePdfToWord}
              />
              <ConversionCard
                icon={FileText}
                title="PDF to Excel"
                description="Extract tables from PDFs into Excel spreadsheets"
                acceptedFiles=".pdf"
                onConvert={handlePdfToExcel}
              />
              <ConversionCard
                icon={FileText}
                title="PDF to PowerPoint"
                description="Convert PDF pages into PowerPoint slides"
                acceptedFiles=".pdf"
                onConvert={handlePdfToPpt}
              />
              <ConversionCard
                icon={FileText}
                title="Merge PDFs"
                description="Combine multiple PDF files into one"
                acceptedFiles=".pdf"
                multipleFiles={true}
                onConvert={handleMergePdfs}
              />
              <ConversionCard
                icon={FileText}
                title="Split PDF"
                description="Extract individual pages from a PDF"
                acceptedFiles=".pdf"
                onConvert={handleSplitPdf}
              />
            </div>
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileImage}
                title="Images to PDF"
                description="Convert JPG, PNG images into a PDF"
                acceptedFiles="image/*"
                multipleFiles={true}
                onConvert={handleImagesToPdf}
              />
              <ConversionCard
                icon={FileImage}
                title="Image Format Converter"
                description="Convert between JPG, PNG, WEBP formats"
                acceptedFiles="image/*"
                onConvert={handleImageFormatConversion}
              />
              <ConversionCard
                icon={FileImage}
                title="Image to SVG"
                description="Convert raster images to scalable vectors"
                acceptedFiles="image/*"
                onConvert={handleImageToSvg}
              />
              <ConversionCard
                icon={FileImage}
                title="Compress Image"
                description="Reduce image file size while maintaining quality"
                acceptedFiles="image/*"
                onConvert={handleCompressImage}
              />
            </div>
          </TabsContent>

          <TabsContent value="document" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileText}
                title="Word to PDF"
                description="Convert Word documents to PDF format"
                acceptedFiles=".docx,.doc"
                onConvert={handleWordToPdf}
              />
              <ConversionCard
                icon={FileText}
                title="Text to PDF"
                description="Convert plain text files to formatted PDFs"
                acceptedFiles=".txt"
                onConvert={handleTextToPdf}
              />
              <ConversionCard
                icon={FileCode}
                title="Markdown to HTML"
                description="Convert Markdown files to HTML"
                acceptedFiles=".md,.markdown"
                onConvert={handleMarkdownToHtml}
              />
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileCode}
                title="Excel to CSV"
                description="Convert Excel workbooks to CSV format"
                acceptedFiles=".xlsx,.xls"
                onConvert={handleExcelToCsv}
              />
              <ConversionCard
                icon={FileCode}
                title="CSV to Excel"
                description="Convert CSV files to Excel workbooks"
                acceptedFiles=".csv"
                onConvert={handleCsvToExcel}
              />
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ConversionCard
                icon={FileVideo}
                title="Video to Audio"
                description="Extract audio tracks from video files"
                acceptedFiles="video/*"
                onConvert={handleVideoToAudio}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary animate-glow" />
              <h3 className="text-2xl font-semibold mb-2">Advanced Conversions Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Audio transcription, EPUB conversion, and more advanced features are on the way!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
