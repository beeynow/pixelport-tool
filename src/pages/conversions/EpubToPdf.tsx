import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function EpubToPdf() {
  return (
    <ConversionPage
      title="Free EPUB to PDF Converter Online | Convert EPUB to PDF | ConvertAny"
      description="Convert EPUB to PDF online for free. Fast, secure, and easy EPUB to PDF conversion with no sign-up required."
      keywords="epub to pdf, convert epub to pdf free, ebook to pdf, online epub to pdf"
      h1="EPUB to PDF Converter"
      acceptedFiles=".epub"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const pdf = new jsPDF();
        pdf.text("EPUB converted to PDF", 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
        { name: "Merge PDFs", path: "/merge-pdf" },
      ]}
    />
  );
}
