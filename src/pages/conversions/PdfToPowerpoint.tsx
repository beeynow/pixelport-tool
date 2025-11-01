import ConversionPage from "@/components/ConversionPage";
import { convertPdfToPowerPoint, downloadFile } from "@/lib/conversions";

export default function PdfToPowerpoint() {
  return (
    <ConversionPage
      title="Free PDF to PowerPoint Converter Online | Convert PDF to PPTX | ConvertAny"
      description="Convert PDF to PowerPoint online for free. Fast, secure, and easy PDF to PPTX conversion with no sign-up required."
      keywords="pdf to powerpoint, pdf to pptx, convert pdf to powerpoint free, online pdf to pptx"
      h1="PDF to PowerPoint Converter"
      acceptedFiles=".pdf"
      outputExtension="pptx"
      conversionHandler={async (files) => {
        const blob = await convertPdfToPowerPoint(files[0]);
        downloadFile(blob, "converted.pptx");
      }}
      relatedTools={[
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "PDF to Excel", path: "/pdf-to-excel" },
        { name: "PowerPoint to PDF", path: "/powerpoint-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
