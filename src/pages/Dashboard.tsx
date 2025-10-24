import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, FileType } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    toast({
      title: "File received!",
      description: "Your file is ready to be converted.",
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "File selected!",
        description: "Your file is ready to be converted.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">
              Convert Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Files
              </span>
            </h1>
            <p className="text-muted-foreground">
              Upload your files below to get started with instant conversion
            </p>
          </div>

          {/* Upload Area */}
          <Card
            className={`p-12 border-2 border-dashed transition-all duration-300 cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50 bg-gradient-card"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Drag & drop your files here
                </h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse from your device
                </p>
              </div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload">
                <Button asChild className="bg-gradient-primary cursor-pointer">
                  <span>Choose File</span>
                </Button>
              </label>
              <div className="pt-4 text-sm text-muted-foreground">
                <p>Supported formats: PDF, Word, JPG, PNG</p>
                <p>Max file size: 10MB (Free) | 100MB (Premium)</p>
              </div>
            </div>
          </Card>

          {/* Conversion Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-card hover:border-primary/50 transition-all group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">PDF to Word</h4>
                  <p className="text-sm text-muted-foreground">Editable documents</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card hover:border-primary/50 transition-all group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Image className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold">Image Convert</h4>
                  <p className="text-sm text-muted-foreground">JPG, PNG, WebP</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card hover:border-primary/50 transition-all group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <FileType className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Word to PDF</h4>
                  <p className="text-sm text-muted-foreground">Share-ready files</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Conversions */}
          <Card className="p-6 bg-gradient-card">
            <h3 className="text-xl font-semibold mb-4">Recent Conversions</h3>
            <div className="text-center py-12 text-muted-foreground">
              <p>No conversions yet. Upload a file to get started!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
