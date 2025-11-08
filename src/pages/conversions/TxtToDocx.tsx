import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function TxtToDocx() {
  return (
    <ConversionPage
      title="Free TXT to DOCX Converter Online | Convert Text to Word | Convertany"
      description="Convert TXT to DOCX files online for free. Fast, secure, and easy Text to Word conversion."
      keywords="txt to docx, text to word, convert txt to docx, txt converter"
      h1="TXT to DOCX Converter"
      acceptedFiles=".txt"
      outputExtension="docx"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const lines = text.split('\n');
        
        const paragraphs = lines.map(line => 
          new Paragraph({
            children: [new TextRun(line)],
          })
        );
        
        const doc = new Document({
          sections: [{
            properties: {},
            children: paragraphs,
          }],
        });
        
        const blob = await Packer.toBlob(doc);
        downloadFile(blob, "converted.docx");
      }}
      relatedTools={[
        { name: "DOCX to TXT", path: "/docx-to-txt" },
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
      ]}
    />
  );
}
