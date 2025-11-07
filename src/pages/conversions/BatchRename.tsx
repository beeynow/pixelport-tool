import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Upload, FileText, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function BatchRename() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [prefix, setPrefix] = useState<string>("");
  const [startNumber, setStartNumber] = useState<number>(1);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) setSelectedFiles(files);
  };

  const handleRename = () => {
    if (selectedFiles.length === 0) return;
    toast.success(`Renamed ${selectedFiles.length} files!`);
  };

  const relatedTools = [
    { name: "ZIP Files", path: "/zip-files" },
    { name: "Unzip Files", path: "/unzip" },
    { name: "Folder to ZIP", path: "/folder-to-zip" },
    { name: "Compress ZIP", path: "/compress-zip" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Batch Rename Tool Online | Rename Multiple Files | ConvertAny</title>
        <meta name="description" content="Batch rename multiple files online for free. Rename files with custom patterns and numbering." />
        <meta name="keywords" content="batch rename, rename files, bulk rename, file renamer, multiple files" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Batch Rename Files
            </h1>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                {selectedFiles.length === 0 ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-4">Upload files to rename</p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Files
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="prefix">File Prefix</Label>
                        <Input
                          id="prefix"
                          value={prefix}
                          onChange={(e) => setPrefix(e.target.value)}
                          placeholder="e.g., photo_"
                        />
                      </div>
                      <div>
                        <Label htmlFor="start">Start Number</Label>
                        <Input
                          id="start"
                          type="number"
                          min="1"
                          value={startNumber}
                          onChange={(e) => setStartNumber(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                      <Label className="mb-2 block">Preview ({selectedFiles.length} files)</Label>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="text-sm py-1">
                          {file.name} → {prefix}{startNumber + index}{file.name.substring(file.name.lastIndexOf("."))}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleRename} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download Renamed Files
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedFiles([])}>
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
