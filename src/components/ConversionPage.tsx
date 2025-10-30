import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Upload, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { downloadFile } from "@/lib/conversions";

type RelatedTool = {
  name: string;
  path: string;
};

type ConversionPageProps = {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  acceptedFiles: string;
  multipleFiles?: boolean;
  outputExtension: string;
  conversionHandler: (files: File[]) => Promise<void>;
  relatedTools: RelatedTool[];
};

export default function ConversionPage({
  title,
  description,
  keywords,
  h1,
  acceptedFiles,
  multipleFiles = false,
  outputExtension,
  conversionHandler,
  relatedTools,
}: ConversionPageProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setSelectedFiles(files);
        setCompleted(false);
        handleConvert(files);
      }
    },
    []
  );

  const handleConvert = useCallback(
    async (files: File[]) => {
      setConverting(true);
      setProgress(0);

      try {
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 5, 95));
        }, 150);

        await conversionHandler(files);

        clearInterval(progressInterval);
        setProgress(100);
        setCompleted(true);

        toast({
          title: "✓ Conversion complete!",
          description:
            "Your file has been converted and downloaded successfully.",
        });

        setTimeout(() => {
          setSelectedFiles([]);
          setProgress(0);
          setCompleted(false);
        }, 3000);
      } catch (error) {
        toast({
          title: "Conversion failed",
          description:
            "There was an error converting your file. Please try again.",
          variant: "destructive",
        });
        setProgress(0);
      } finally {
        setConverting(false);
      }
    },
    [conversionHandler, toast]
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {h1}
            </h1>
            <p className="text-muted-foreground text-center mb-8 text-lg">
              {description}
            </p>

            {/* Upload Section */}
            <Card className="mb-8 border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-8">
                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-border hover:border-primary rounded-lg p-12 text-center transition-all hover:bg-primary/5">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">
                      {multipleFiles
                        ? "Click to upload files"
                        : "Click to upload file"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {multipleFiles
                        ? "Select multiple files"
                        : "Select a file"}{" "}
                      to convert
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept={acceptedFiles}
                    multiple={multipleFiles}
                    onChange={handleFileSelect}
                    disabled={converting}
                  />
                </label>
              </CardContent>
            </Card>

            {/* Conversion Progress */}
            {converting && (
              <Card className="mb-8 border-2 border-primary/30 animate-scale-in">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <div className="text-left">
                        <p className="text-xl font-bold">Converting...</p>
                        <p className="text-sm text-muted-foreground">
                          Processing your file
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>
                          {progress < 100 ? "Processing..." : "Complete!"}
                        </span>
                        <span className="text-primary text-lg font-bold">
                          {progress}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Success Message */}
            {completed && (
              <Card className="mb-8 border-2 border-primary animate-scale-in">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-4 text-primary">
                    <CheckCircle2 className="w-12 h-12" />
                    <div>
                      <p className="text-2xl font-bold">Success!</p>
                      <p className="text-sm text-foreground/80">
                        File converted and downloaded
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Tools */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Converters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="p-4 rounded-lg border border-border hover:border-primary bg-card hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{tool.name}</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
