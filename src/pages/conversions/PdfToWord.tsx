import ConversionPage from "@/components/ConversionPage";
import { convertPdfToWord, downloadFile } from "@/lib/conversions";

export default function PdfToWord() {
  return (
    <ConversionPage
      title="Free PDF to Word Converter Online | Convert PDF to DOCX | ConvertAny"
      description="Convert PDF to Word documents online for free. Fast, secure, and easy PDF to DOCX conversion with no sign-up required."
      keywords="pdf to word, pdf to docx, convert pdf to word free, pdf converter, online pdf converter"
      h1="PDF to Word Converter"
      acceptedFiles=".pdf"
      outputExtension="docx"
      conversionHandler={async (files) => {
        const blob = await convertPdfToWord(files[0]);
        downloadFile(blob, "converted.docx");
      }}
      relatedTools={[
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "PDF to Excel", path: "/pdf-to-excel" },
        { name: "Compress PDF", path: "/compress-pdf" },
        { name: "Merge PDFs", path: "/merge-pdf" },
      ]}
    />
  );
}
