import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Upload, Loader2, CheckCircle2, ArrowRight, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  conversionHandler: (files: File[], options?: any) => Promise<void>;
  relatedTools: RelatedTool[];
  renderEditOptions?: (files: File[], onOptionsChange: (options: any) => void) => React.ReactNode;
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
  renderEditOptions,
}: ConversionPageProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [editOptions, setEditOptions] = useState<any>({});
  const [showEditUI, setShowEditUI] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setSelectedFiles(files);
        setCompleted(false);
        if (renderEditOptions) {
          setShowEditUI(true);
        } else {
          handleConvert(files);
        }
      }
    },
    [renderEditOptions]
  );

  const handleConvert = useCallback(
    async (files: File[], options?: any) => {
      setConverting(true);
      setProgress(0);
      setConvertedBlob(null);
      setShowEditUI(false);

      try {
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 5, 95));
        }, 100);

        await conversionHandler(files, options || editOptions);

        clearInterval(progressInterval);
        setProgress(100);
        setCompleted(true);

        toast({
          title: "✓ Conversion complete!",
          description: "Your file has been converted successfully.",
        });
      } catch (error) {
        toast({
          title: "Conversion failed",
          description: "There was an error converting your file. Please try again.",
          variant: "destructive",
        });
        setProgress(0);
        setCompleted(false);
      } finally {
        setConverting(false);
      }
    },
    [conversionHandler, toast, editOptions]
  );

  const handleShare = async () => {
    if (navigator.share && convertedBlob) {
      try {
        const file = new File([convertedBlob], `converted.${outputExtension}`, {
          type: convertedBlob.type,
        });
        await navigator.share({
          files: [file],
          title: "Converted File",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const handleNewConversion = () => {
    setSelectedFiles([]);
    setProgress(0);
    setCompleted(false);
    setConvertedBlob(null);
    setShowEditUI(false);
    setEditOptions({});
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://convertany.site${window.location.pathname}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://convertany.site${window.location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
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
                      Drag & drop files here
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse
                    </p>
                    <div className="flex gap-3 justify-center items-center">
                      <Button type="button" variant="outline" size="lg" className="gap-2 pointer-events-none">
                        <Upload className="h-5 w-5" />
                        Choose Files
                      </Button>
                      <Link to="/conversions">
                        <Button type="button" variant="default" size="lg" className="gap-2">
                          <ArrowRight className="h-5 w-5" />
                          Select Tool
                        </Button>
                      </Link>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Accepted formats: {acceptedFiles}
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

            {/* Edit Options UI */}
            {showEditUI && selectedFiles.length > 0 && renderEditOptions && (
              <Card className="mb-8 border-2 border-primary/30 animate-scale-in">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">
                    Customize Your Conversion
                  </h3>
                  {renderEditOptions(selectedFiles, setEditOptions)}
                  <div className="flex justify-center gap-3 mt-6">
                    <Button
                      onClick={() => handleConvert(selectedFiles, editOptions)}
                      size="lg"
                      disabled={converting}
                    >
                      Convert Now
                    </Button>
                    <Button
                      onClick={handleNewConversion}
                      variant="outline"
                      size="lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

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
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 text-primary">
                      <CheckCircle2 className="w-12 h-12" />
                      <div>
                        <p className="text-2xl font-bold">Success!</p>
                        <p className="text-sm text-foreground/80">
                          File converted successfully
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleNewConversion} size="lg">
                        Convert Another File
                      </Button>
                      {navigator.share && (
                        <Button onClick={handleShare} variant="outline" size="lg">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      )}
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
