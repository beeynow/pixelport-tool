import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function RtfToPdf() {
  return (
    <ConversionPage
      title="Free RTF to PDF Converter Online | Convert RTF to PDF | ConvertAny"
      description="Convert RTF to PDF online for free. Fast, secure, and easy Rich Text Format to PDF conversion with no sign-up required."
      keywords="rtf to pdf, convert rtf to pdf free, rich text to pdf, online rtf to pdf"
      h1="RTF to PDF Converter"
      acceptedFiles=".rtf"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(text, 180);
        pdf.text(lines, 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "ODT to PDF", path: "/odt-to-pdf" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Text to PDF", path: "/text-to-pdf" },
      ]}
    />
  );
}
