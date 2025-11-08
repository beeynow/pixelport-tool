import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function JsonToPdf() {
  return (
    <ConversionPage
      title="Free JSON to PDF Converter Online | Convert JSON to PDF | Convertany"
      description="Convert JSON to PDF files online for free. Fast, secure, and easy JSON to PDF conversion."
      keywords="json to pdf, convert json to pdf, json converter, online json to pdf"
      h1="JSON to PDF Converter"
      acceptedFiles=".json"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const json = JSON.parse(text);
        const formatted = JSON.stringify(json, null, 2);
        
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(formatted, 180);
        pdf.text(lines, 15, 15);
        
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "JSON to CSV", path: "/json-to-csv" },
        { name: "JSON to Excel", path: "/json-to-excel" },
        { name: "JSON to XML", path: "/json-to-xml" },
        { name: "Text to PDF", path: "/text-to-pdf" },
      ]}
    />
  );
}
