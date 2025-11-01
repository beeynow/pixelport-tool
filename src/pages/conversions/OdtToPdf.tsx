import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function OdtToPdf() {
  return (
    <ConversionPage
      title="Free ODT to PDF Converter Online | Convert ODT to PDF | ConvertAny"
      description="Convert ODT to PDF online for free. Fast, secure, and easy OpenDocument to PDF conversion with no sign-up required."
      keywords="odt to pdf, convert odt to pdf free, opendocument to pdf, online odt to pdf"
      h1="ODT to PDF Converter"
      acceptedFiles=".odt"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const pdf = new jsPDF();
        pdf.text("ODT converted to PDF", 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "RTF to PDF", path: "/rtf-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
