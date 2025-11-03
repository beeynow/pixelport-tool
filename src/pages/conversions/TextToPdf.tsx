import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, FileText, Link as LinkIcon } from "lucide-react";
import { convertTextToPdf, downloadFile } from "@/lib/conversions";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function TextToPdf() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [fontWeight, setFontWeight] = useState("normal");
  const [padding, setPadding] = useState(15);
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }

    setIsConverting(true);
    try {
      const blob = await convertTextToPdf(text, { fontSize, fontWeight, padding });
      downloadFile(blob, "converted.pdf");
      toast.success("PDF generated successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setIsConverting(false);
    }
  };

  const relatedTools = [
    { name: "PDF to Word", path: "/pdf-to-word" },
    { name: "Word to PDF", path: "/word-to-pdf" },
    { name: "Markdown to HTML", path: "/markdown-to-html" },
    { name: "Text to QR", path: "/text-to-qr" },
  ];

  return (
    <>
      <Helmet>
        <title>Free Text to PDF Converter Online | Convert TXT to PDF | ConvertAny</title>
        <meta name="description" content="Convert text to PDF online for free with custom formatting options. Choose font size, weight, and padding. Fast, secure, and easy TXT to PDF conversion with no sign-up required. Professional text to PDF converter with formatting controls for creating beautifully formatted PDF documents from plain text." />
        <meta name="keywords" content="text to pdf, txt to pdf, convert text to pdf free, text converter, online text to pdf, format text pdf, custom pdf generator" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Text to PDF Converter
            </h1>
            
            <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
              Transform your plain text into professionally formatted PDF documents with complete control over typography and layout. Our advanced text to PDF converter offers customizable font sizes, weights, and padding options to create documents that match your exact specifications.
            </p>

            <Card className="mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="text-input" className="text-lg font-semibold mb-2 block">
                      Enter Your Text
                    </Label>
                    <Textarea
                      id="text-input"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type or paste your text here..."
                      className="min-h-[300px] text-base font-mono resize-y"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="font-size" className="mb-2 block">
                        Font Size: {fontSize}pt
                      </Label>
                      <Slider
                        id="font-size"
                        min={8}
                        max={24}
                        step={1}
                        value={[fontSize]}
                        onValueChange={(value) => setFontSize(value[0])}
                        className="mb-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="font-weight" className="mb-2 block">
                        Font Weight
                      </Label>
                      <Select value={fontWeight} onValueChange={setFontWeight}>
                        <SelectTrigger id="font-weight">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="padding" className="mb-2 block">
                        Padding: {padding}mm
                      </Label>
                      <Slider
                        id="padding"
                        min={5}
                        max={30}
                        step={1}
                        value={[padding]}
                        onValueChange={(value) => setPadding(value[0])}
                        className="mb-2"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleConvert} 
                    disabled={isConverting || !text.trim()}
                    size="lg"
                    className="w-full gap-2"
                  >
                    <Download className="h-5 w-5" />
                    {isConverting ? "Generating PDF..." : "Convert to PDF"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Professional Text to PDF Conversion</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our text to PDF converter provides professional-grade document creation with complete formatting control. Whether you're converting meeting notes, creating documentation, or preparing manuscripts, our tool gives you the flexibility to create perfectly formatted PDF documents. The intuitive interface allows you to adjust font sizes from 8pt to 24pt, choose between normal and bold font weights, and customize document padding from 5mm to 30mm for optimal readability.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Advanced Formatting Features</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unlike basic text converters, our tool offers granular control over document appearance. The font size slider allows precise adjustment for different document types - use smaller fonts for dense technical documentation or larger fonts for presentations and reading materials. The font weight option lets you emphasize content with bold text, while the padding control ensures your documents have appropriate margins for professional presentation. All settings update in real-time, giving you immediate visual feedback before generating your PDF.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Why Choose Our Text to PDF Converter?</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Complete Format Control:</strong> Customize font size, weight, and padding to match your exact requirements</li>
                <li><strong>Professional Output:</strong> Generate clean, well-formatted PDF documents suitable for any purpose</li>
                <li><strong>Instant Processing:</strong> Convert text to PDF in seconds without waiting or uploading to servers</li>
                <li><strong>Privacy Focused:</strong> All processing happens in your browser - your text never leaves your device</li>
                <li><strong>No File Size Limits:</strong> Convert documents of any length with no restrictions</li>
                <li><strong>Cross-Platform Compatible:</strong> Works perfectly on desktop, tablet, and mobile devices</li>
                <li><strong>Zero Cost:</strong> Completely free to use with no hidden fees or subscription requirements</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Perfect for Every Use Case</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our converter is ideal for students creating study notes, professionals preparing documentation, writers formatting manuscripts, and anyone who needs to quickly convert plain text into professional PDF format. The customizable formatting options ensure your documents look exactly the way you want them, whether you're creating formal business documents, casual reading materials, or technical specifications. The tool handles large documents effortlessly, making it perfect for converting entire books, research papers, or comprehensive reports.
              </p>
            </div>

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
                        <Button 
                          variant="outline" 
                          className="w-full gap-2 hover:bg-primary/10"
                        >
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
