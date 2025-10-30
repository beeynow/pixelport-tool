import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Image as ImageIcon,
  FileImage,
  FileAudio,
  FileCode,
  Minimize2,
  FileSpreadsheet,
  Video,
} from "lucide-react";

const quickConversions = [
  {
    icon: FileText,
    title: "PDF → Word",
    description: "Convert to DOCX",
    path: "/conversions",
  },
  {
    icon: ImageIcon,
    title: "JPG → PNG",
    description: "Change format",
    path: "/conversions",
  },
  {
    icon: Video,
    title: "MP4 → GIF",
    description: "Video to GIF",
    path: "/conversions",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel → PDF",
    description: "Convert spreadsheet",
    path: "/conversions",
  },
  {
    icon: FileImage,
    title: "PDF → JPG",
    description: "Extract images",
    path: "/conversions",
  },
];

export default function PopularConversions() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Popular Conversions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick access to the most used file conversion tools
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {quickConversions.map((conversion, index) => (
            <Link key={index} to={conversion.path} className="group">
              <Card
                className="hover:shadow-glow transition-all hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 flex items-center gap-4 min-w-[200px]">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <conversion.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {conversion.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {conversion.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
