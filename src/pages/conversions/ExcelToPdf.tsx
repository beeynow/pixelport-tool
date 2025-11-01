import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function ExcelToPdf() {
  return (
    <ConversionPage
      title="Free Excel to PDF Converter Online | Convert XLSX to PDF | ConvertAny"
      description="Convert Excel to PDF online for free. Fast, secure, and easy XLSX to PDF conversion with no sign-up required."
      keywords="excel to pdf, xlsx to pdf, convert excel to pdf free, online excel to pdf"
      h1="Excel to PDF Converter"
      acceptedFiles=".xlsx,.xls"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const arrayBuffer = await files[0].arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(csv, 180);
        pdf.text(lines, 15, 15);
        
        const blob = pdf.output('blob');
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "PDF to Excel", path: "/pdf-to-excel" },
        { name: "Excel to CSV", path: "/excel-to-csv" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
