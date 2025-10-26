import { FileType, Zap, Shield, Download, Sparkles, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Conversion",
    description: "Convert PDF to Word, compress images, and process files in seconds. Our free online file converter delivers instant results.",
  },
  {
    icon: Shield,
    title: "100% Secure & Private",
    description: "Your files are encrypted during conversion and automatically deleted after 24 hours. Your privacy is guaranteed.",
  },
  {
    icon: FileType,
    title: "OCR & Format Support",
    description: "OCR PDF to text, convert scanned documents, JPG to PNG, Word to PDF, EPUB to PDF, and 50+ more formats supported.",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Download converted files immediately. No email required, no sign-up, just instant access to your files.",
  },
  {
    icon: Sparkles,
    title: "Image Compression Tool",
    description: "Free online image compression tool reduces file size while maintaining quality. Perfect for web optimization.",
  },
  {
    icon: Clock,
    title: "Batch File Converter",
    description: "Convert multiple files at once with our batch converter. Upload up to 20 files and convert them simultaneously.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Best Free{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Online File Converter
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PDF editor online free, image converter, video to MP3 converter, and more. 
            Everything you need for file conversion in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
