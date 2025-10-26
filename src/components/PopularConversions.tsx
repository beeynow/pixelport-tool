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
  Video
} from "lucide-react";

const popularConversions = [
  {
    icon: FileText,
    title: "Free PDF to Word Converter",
    description: "Convert PDF to editable Word documents online",
    path: "/conversions",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: FileImage,
    title: "Image to PDF Converter",
    description: "Convert JPG, PNG images to PDF instantly",
    path: "/conversions",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: ImageIcon,
    title: "Convert JPG to PNG",
    description: "Free online image format converter",
    path: "/conversions",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: FileText,
    title: "PDF Editor Online Free",
    description: "Merge, split, compress PDFs online",
    path: "/conversions",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: FileSpreadsheet,
    title: "Batch File Converter",
    description: "Convert multiple files simultaneously",
    path: "/conversions",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    icon: FileCode,
    title: "OCR PDF to Text",
    description: "Extract text from scanned PDFs with OCR",
    path: "/conversions",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  },
  {
    icon: FileText,
    title: "Convert Word to PDF",
    description: "Transform DOCX to PDF format",
    path: "/conversions",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  },
  {
    icon: Minimize2,
    title: "Image Compression Tool",
    description: "Compress images online for free",
    path: "/conversions",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    icon: FileText,
    title: "Convert EPUB to PDF",
    description: "Convert eBooks to PDF format",
    path: "/conversions",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10"
  },
  {
    icon: Video,
    title: "Convert Video to MP3",
    description: "Extract audio from video files",
    path: "/conversions",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: FileText,
    title: "Compress PDF Online",
    description: "Reduce PDF file size for free",
    path: "/conversions",
    color: "text-lime-500",
    bgColor: "bg-lime-500/10"
  },
  {
    icon: FileAudio,
    title: "Convert Scanned PDF to Word",
    description: "OCR technology for scanned documents",
    path: "/conversions",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  }
];

export default function PopularConversions() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Popular{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              File Conversions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Most searched and used free online file conversion tools. Convert PDF, images, videos, and documents instantly without software installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularConversions.map((conversion, index) => (
            <Link 
              key={index} 
              to={conversion.path}
              className="block group"
            >
              <Card className="h-full hover:shadow-glow transition-all duration-300 hover:border-primary/50 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${conversion.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <conversion.icon className={`w-6 h-6 ${conversion.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {conversion.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {conversion.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need more tools? Explore our complete suite of{" "}
            <Link to="/conversions" className="text-primary hover:underline font-semibold">
              free online file conversion tools
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
