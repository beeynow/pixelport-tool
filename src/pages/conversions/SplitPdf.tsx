import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText, Link as LinkIcon } from "lucide-react";
import { splitPdf, downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function SplitPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [isSplitting, setIsSplitting] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setNumPages(pdf.numPages);

      const previews: string[] = [];
      for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext as any).promise;
        previews.push(canvas.toDataURL());
      }
      setPagePreviews(previews);
    } catch (error) {
      toast.error("Failed to load PDF");
    }
  };

  const handleSplit = async () => {
    if (!selectedFile) return;

    setIsSplitting(true);
    try {
      const blobs = await splitPdf(selectedFile);
      blobs.forEach((blob, index) => {
        downloadFile(blob, `page-${index + 1}.pdf`);
      });
      toast.success(`PDF split into ${blobs.length} pages!`);
    } catch (error) {
      toast.error("Failed to split PDF");
    } finally {
      setIsSplitting(false);
    }
  };

  const relatedTools = [
    { name: "Merge PDFs", path: "/merge-pdf" },
    { name: "Compress PDF", path: "/compress-pdf" },
    { name: "PDF to Word", path: "/pdf-to-word" },
    { name: "PDF to Image", path: "/pdf-to-image" },
  ];

  return (
    <>
      <Helmet>
        <title>Free PDF Splitter Online | Split PDF Pages | ConvertAny</title>
        <meta name="description" content="Split PDF files online for free. Separate PDF pages into individual documents. Fast, secure, and easy with no sign-up required." />
        <meta name="keywords" content="split pdf, separate pdf pages, pdf splitter, divide pdf, online pdf split" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Split PDF
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {!selectedFile ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg mb-4">Upload a PDF to split</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Choose PDF File
                        </label>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="font-semibold text-lg">
                        PDF loaded: {numPages} page{numPages !== 1 ? "s" : ""}
                      </p>
                      
                      {pagePreviews.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Preview (showing first {pagePreviews.length} pages)
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
                            {pagePreviews.map((preview, index) => (
                              <div key={index} className="border rounded-lg p-2 bg-muted/20">
                                <img src={preview} alt={`Page ${index + 1}`} className="w-full" />
                                <p className="text-center text-sm mt-2">Page {index + 1}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleSplit}
                        disabled={isSplitting}
                        className="flex-1 gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {isSplitting ? "Splitting..." : "Split & Download All Pages"}
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
