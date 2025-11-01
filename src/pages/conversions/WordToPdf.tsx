import ConversionPage from "@/components/ConversionPage";
import { convertWordToPdf, downloadFile } from "@/lib/conversions";

export default function WordToPdf() {
  return (
    <ConversionPage
      title="Free Word to PDF Converter Online | Convert DOCX to PDF | ConvertAny"
      description="Convert Word documents to PDF online for free. Fast, secure, and easy DOCX to PDF conversion with no sign-up required."
      keywords="word to pdf, docx to pdf, convert word to pdf free, word converter, online word to pdf"
      h1="Word to PDF Converter"
      acceptedFiles=".doc,.docx"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const blob = await convertWordToPdf(files[0]);
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "PDF to Excel", path: "/pdf-to-excel" },
        { name: "Compress PDF", path: "/compress-pdf" },
        { name: "Merge PDFs", path: "/merge-pdf" },
      ]}
    />
  );
}
