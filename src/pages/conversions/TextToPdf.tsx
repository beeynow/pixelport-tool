import ConversionPage from "@/components/ConversionPage";
import { convertTextToPdf, downloadFile } from "@/lib/conversions";

export default function TextToPdf() {
  return (
    <ConversionPage
      title="Free Text to PDF Converter Online | Convert TXT to PDF | ConvertAny"
      description="Convert text files to PDF online for free. Fast, secure, and easy TXT to PDF conversion with no sign-up required."
      keywords="text to pdf, txt to pdf, convert text to pdf free, text converter, online text to pdf"
      h1="Text to PDF Converter"
      acceptedFiles=".txt"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const blob = await convertTextToPdf(files[0]);
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "Markdown to HTML", path: "/markdown-to-html" },
        { name: "Text to QR", path: "/text-to-qr" },
      ]}
    />
  );
}
