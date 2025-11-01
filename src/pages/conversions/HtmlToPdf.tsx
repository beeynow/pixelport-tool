import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function HtmlToPdf() {
  return (
    <ConversionPage
      title="Free HTML to PDF Converter Online | Convert HTML to PDF | ConvertAny"
      description="Convert HTML to PDF online for free. Fast, secure, and easy HTML to PDF conversion with no sign-up required."
      keywords="html to pdf, convert html to pdf free, html converter, online html to pdf"
      h1="HTML to PDF Converter"
      acceptedFiles=".html,.htm"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const html = await files[0].text();
        const pdf = new jsPDF();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        const lines = pdf.splitTextToSize(text, 180);
        pdf.text(lines, 15, 15);
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "Markdown to HTML", path: "/markdown-to-html" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
      ]}
    />
  );
}
