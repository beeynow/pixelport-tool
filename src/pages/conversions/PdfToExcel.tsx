import ConversionPage from "@/components/ConversionPage";
import { convertPdfToExcel, downloadFile } from "@/lib/conversions";

export default function PdfToExcel() {
  return (
    <ConversionPage
      title="Free PDF to Excel Converter Online | Convert PDF to XLSX | ConvertAny"
      description="Convert PDF to Excel spreadsheets online for free. Fast, secure, and easy PDF to XLSX conversion with no sign-up required."
      keywords="pdf to excel, pdf to xlsx, convert pdf to excel free, pdf converter, online pdf to excel"
      h1="PDF to Excel Converter"
      acceptedFiles=".pdf"
      outputExtension="xlsx"
      conversionHandler={async (files) => {
        const blob = await convertPdfToExcel(files[0]);
        downloadFile(blob, "converted.xlsx");
      }}
      relatedTools={[
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Excel to PDF", path: "/excel-to-pdf" },
        { name: "Excel to CSV", path: "/excel-to-csv" },
        { name: "PDF to PowerPoint", path: "/pdf-to-powerpoint" },
      ]}
    />
  );
}
