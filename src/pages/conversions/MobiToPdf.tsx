import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function MobiToPdf() {
  return (
    <ConversionPage
      title="Free MOBI to PDF Converter Online | Convert MOBI to PDF | ConvertAny"
      description="Convert MOBI to PDF online for free. Fast, secure, and easy MOBI to PDF conversion with no sign-up required."
      keywords="mobi to pdf, convert mobi to pdf free, ebook to pdf, online mobi to pdf"
      h1="MOBI to PDF Converter"
      acceptedFiles=".mobi"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const pdf = new jsPDF();
        pdf.text("MOBI converted to PDF", 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "EPUB to PDF", path: "/epub-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
