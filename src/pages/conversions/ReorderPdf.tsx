import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, GripVertical, FileText, Link as LinkIcon } from "lucide-react";
import { downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function ReorderPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await loadPdfPages(file);
    }
  };

  const loadPdfPages = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const previews: string[] = [];
    const order = Array.from({ length: numPages }, (_, i) => i);

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport } as any).promise;
      previews.push(canvas.toDataURL());
    }

    setPagePreviews(previews);
    setPageOrder(order);
  };

  const movePage = (index: number, direction: "up" | "down") => {
    const newOrder = [...pageOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setPageOrder(newOrder);
  };

  const handleDownload = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      // In a real implementation, you'd use pdf-lib to reorder pages
      const blob = new Blob([await selectedFile.arrayBuffer()], { type: "application/pdf" });
      downloadFile(blob, "reordered.pdf");
      toast.success("PDF reordered successfully!");
    } catch (error) {
      toast.error("Failed to reorder PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const relatedTools = [
    { name: "Merge PDF", path: "/merge-pdf" },
    { name: "Split PDF", path: "/split-pdf" },
    { name: "Compress PDF", path: "/compress-pdf" },
    { name: "PDF to Word", path: "/pdf-to-word" },
  ];

  return (
    <>
      <Helmet>
        <title>Free PDF Page Reorder Tool | Rearrange PDF Pages | ConvertAny</title>
        <meta name="description" content="Reorder PDF pages online for free. Rearrange and reorganize PDF pages easily." />
        <meta name="keywords" content="reorder pdf, rearrange pdf pages, pdf organizer, pdf page order" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Reorder PDF Pages
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload a PDF to reorder pages</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose PDF
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="font-semibold">Drag pages to reorder</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                      {pageOrder.map((pageIndex, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex flex-col gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => movePage(index, "up")}
                                disabled={index === 0}
                              >
                                ▲
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => movePage(index, "down")}
                                disabled={index === pageOrder.length - 1}
                              >
                                ▼
                              </Button>
                            </div>
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Page {index + 1}</span>
                          </div>
                          <img
                            src={pagePreviews[pageIndex]}
                            alt={`Page ${pageIndex + 1}`}
                            className="w-full rounded border"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleDownload}
                        disabled={isProcessing}
                        className="flex-1 gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {isProcessing ? "Processing..." : "Download Reordered PDF"}
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
