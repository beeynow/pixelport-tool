import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function CsvToPdf() {
  return (
    <ConversionPage
      title="Free CSV to PDF Converter Online | Convert CSV to PDF | Convertany"
      description="Convert CSV to PDF files online for free. Fast, secure, and easy CSV to PDF conversion."
      keywords="csv to pdf, convert csv to pdf, csv converter, online csv to pdf"
      h1="CSV to PDF Converter"
      acceptedFiles=".csv"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(text, 180);
        pdf.text(lines, 15, 15);
        
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "CSV to Excel", path: "/csv-to-excel" },
        { name: "CSV to JSON", path: "/csv-to-json" },
        { name: "Excel to PDF", path: "/excel-to-pdf" },
        { name: "Text to PDF", path: "/text-to-pdf" },
      ]}
    />
  );
}
