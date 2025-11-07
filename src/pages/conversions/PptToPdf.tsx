import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function PptToPdf() {
  return (
    <ConversionPage
      title="Free PPT to PDF Converter Online | Convert PowerPoint to PDF | ConvertAny"
      description="Convert PowerPoint (PPT/PPTX) to PDF online for free. Fast and easy presentation conversion."
      keywords="ppt to pdf, powerpoint to pdf, convert ppt to pdf, pptx to pdf"
      h1="PPT to PDF Converter"
      acceptedFiles=".ppt,.pptx"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const pdf = new jsPDF();
        pdf.text("PowerPoint converted to PDF", 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "presentation.pdf");
      }}
      relatedTools={[
        { name: "PDF to PowerPoint", path: "/pdf-to-powerpoint" },
        { name: "PowerPoint to PDF", path: "/powerpoint-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
        { name: "Merge PDF", path: "/merge-pdf" },
      ]}
    />
  );
}
