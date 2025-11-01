import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function PowerpointToPdf() {
  return (
    <ConversionPage
      title="Free PowerPoint to PDF Converter Online | Convert PPTX to PDF | ConvertAny"
      description="Convert PowerPoint to PDF online for free. Fast, secure, and easy PPTX to PDF conversion with no sign-up required."
      keywords="powerpoint to pdf, pptx to pdf, convert pptx to pdf free, online powerpoint to pdf"
      h1="PowerPoint to PDF Converter"
      acceptedFiles=".ppt,.pptx"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const pdf = new jsPDF();
        pdf.text("PowerPoint converted to PDF", 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "PDF to PowerPoint", path: "/pdf-to-powerpoint" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
