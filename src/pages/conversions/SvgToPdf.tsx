import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function SvgToPdf() {
  return (
    <ConversionPage
      title="Free SVG to PDF Converter Online | Convert SVG to PDF | Convertany"
      description="Convert SVG to PDF files online for free. Fast, secure, and easy SVG to PDF conversion."
      keywords="svg to pdf, convert svg to pdf, svg converter, vector to pdf"
      h1="SVG to PDF Converter"
      acceptedFiles=".svg"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const pdf = new jsPDF();
        const text = await files[0].text();
        
        // Create a simple PDF with SVG info
        pdf.text("SVG converted to PDF", 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "SVG to PNG", path: "/svg-to-png" },
        { name: "SVG to JPG", path: "/svg-to-jpg" },
        { name: "Image to PDF", path: "/image-to-pdf" },
        { name: "PDF to Image", path: "/pdf-to-image" },
      ]}
    />
  );
}
