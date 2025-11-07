import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, FileText, Link as LinkIcon, Copy } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToText() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await extractText(file);
    }
  };

  const extractText = async (file: File) => {
    setIsExtracting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += `\n--- Page ${i} ---\n${pageText}\n`;
      }

      setExtractedText(fullText);
      toast.success("Text extracted successfully!");
    } catch (error) {
      toast.error("Failed to extract text from PDF");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    downloadFile(blob, "extracted-text.txt");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    toast.success("Text copied to clipboard!");
  };

  const relatedTools = [
    { name: "PDF to Word", path: "/pdf-to-word" },
    { name: "PDF OCR", path: "/pdf-ocr" },
    { name: "Text to PDF", path: "/text-to-pdf" },
    { name: "PDF to Excel", path: "/pdf-to-excel" },
  ];

  return (
    <>
      <Helmet>
        <title>Free PDF to Text Converter Online | Extract Text from PDF | ConvertAny</title>
        <meta name="description" content="Extract text from PDF files online for free. Convert PDF to text format easily." />
        <meta name="keywords" content="pdf to text, extract text from pdf, pdf text extractor, convert pdf to txt" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PDF to Text Converter
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload a PDF to extract text</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild disabled={isExtracting}>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose PDF
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Extracted Text</Label>
                      <Textarea
                        value={extractedText}
                        readOnly
                        className="min-h-[400px] font-mono text-sm"
                        placeholder={isExtracting ? "Extracting text..." : ""}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleDownload} disabled={!extractedText || isExtracting} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Text
                      </Button>
                      <Button onClick={handleCopy} disabled={!extractedText || isExtracting} variant="outline" className="gap-2">
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                      <Button variant="outline" onClick={() => { setSelectedFile(null); setExtractedText(""); }}>
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
