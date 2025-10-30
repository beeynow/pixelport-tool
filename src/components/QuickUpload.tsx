import { useNavigate } from "react-router-dom";
import { Upload, FileText, Image, Film, Music } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function QuickUpload() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/conversions");
  };

  const supportedFormats = [
    { icon: FileText, label: "PDF, Word, Excel" },
    { icon: Image, label: "JPG, PNG, GIF" },
    { icon: Film, label: "MP4, AVI, MOV" },
    { icon: Music, label: "MP3, WAV, AAC" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card
            className="p-12 border-2 border-dashed border-border hover:border-primary/50 transition-all cursor-pointer group animate-fade-in"
            onClick={handleUploadClick}
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-primary-foreground" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">
                  Drag & Drop or Click to Upload
                </h3>
                <p className="text-muted-foreground">
                  Select any file to get started with conversion
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {supportedFormats.map((format, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <format.icon className="w-6 h-6 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {format.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground pt-2">
                Maximum file size:{" "}
                <span className="font-semibold text-foreground">100MB</span> •
                All formats supported
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
