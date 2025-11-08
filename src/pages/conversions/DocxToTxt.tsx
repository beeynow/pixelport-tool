import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import mammoth from "mammoth";

export default function DocxToTxt() {
  return (
    <ConversionPage
      title="Free DOCX to TXT Converter Online | Convert Word to Text | Convertany"
      description="Convert DOCX to TXT files online for free. Fast, secure, and easy Word to Text conversion."
      keywords="docx to txt, word to text, convert docx to txt, docx converter"
      h1="DOCX to TXT Converter"
      acceptedFiles=".docx,.doc"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const arrayBuffer = await files[0].arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const blob = new Blob([result.value], { type: 'text/plain' });
        downloadFile(blob, "converted.txt");
      }}
      relatedTools={[
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "PDF to Text", path: "/pdf-to-text" },
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
      ]}
    />
  );
}
