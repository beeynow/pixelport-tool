import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, GripVertical, X, FileText, Link as LinkIcon } from "lucide-react";
import { mergePdfs, downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function MergePdf() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(true);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === selectedFiles.length - 1)
    ) {
      return;
    }

    const newFiles = [...selectedFiles];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setSelectedFiles(newFiles);
  };

  const handleFinishUpload = () => {
    if (selectedFiles.length < 2) {
      toast.error("Please select at least 2 PDF files to merge");
      return;
    }
    setIsUploading(false);
  };

  const handleMerge = async () => {
    setIsMerging(true);
    try {
      const blob = await mergePdfs(selectedFiles);
      downloadFile(blob, "merged.pdf");
      toast.success("PDFs merged successfully!");
    } catch (error) {
      toast.error("Failed to merge PDFs");
    } finally {
      setIsMerging(false);
    }
  };

  const relatedTools = [
    { name: "Split PDF", path: "/split-pdf" },
    { name: "Compress PDF", path: "/compress-pdf" },
    { name: "PDF to Word", path: "/pdf-to-word" },
    { name: "PDF to Excel", path: "/pdf-to-excel" },
  ];

  return (
    <>
      <Helmet>
        <title>Free PDF Merger Online | Combine PDF Files | ConvertAny</title>
        <meta name="description" content="Merge PDF files online for free. Combine multiple PDFs into one document. Fast, secure, and easy with no sign-up required." />
        <meta name="keywords" content="merge pdf, combine pdf, pdf merger, join pdf files, online pdf merge" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Merge PDF Files
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg mb-4">Upload PDF files to merge</p>
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Choose PDF Files
                        </label>
                      </Button>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-3">
                        <p className="font-semibold">{selectedFiles.length} file(s) selected</p>
                        <div className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 border rounded-lg bg-muted/20"
                            >
                              <span className="flex-1 truncate">{file.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button onClick={handleFinishUpload} className="w-full">
                          Finish Upload & Arrange
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="font-semibold">Arrange PDF Order</p>
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 border rounded-lg bg-muted/20"
                          >
                            <div className="flex flex-col gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveFile(index, "up")}
                                disabled={index === 0}
                              >
                                ▲
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveFile(index, "down")}
                                disabled={index === selectedFiles.length - 1}
                              >
                                ▼
                              </Button>
                            </div>
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <span className="flex-1 truncate">
                              {index + 1}. {file.name}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleMerge}
                        disabled={isMerging}
                        className="flex-1 gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {isMerging ? "Merging..." : "Merge & Download"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedFiles([]);
                          setIsUploading(true);
                        }}
                      >
                        Start Over
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
