import ConversionPage from "@/components/ConversionPage";
import { convertExcelToCsv, downloadFile } from "@/lib/conversions";

export default function ExcelToCsv() {
  return (
    <ConversionPage
      title="Free Excel to CSV Converter Online | Convert XLSX to CSV | ConvertAny"
      description="Convert Excel to CSV files online for free. Fast, secure, and easy XLSX to CSV conversion with no sign-up required."
      keywords="excel to csv, xlsx to csv, convert excel to csv free, excel converter, online excel to csv"
      h1="Excel to CSV Converter"
      acceptedFiles=".xlsx,.xls"
      outputExtension="csv"
      conversionHandler={async (files) => {
        const blob = await convertExcelToCsv(files[0]);
        downloadFile(blob, "converted.csv");
      }}
      relatedTools={[
        { name: "CSV to Excel", path: "/csv-to-excel" },
        { name: "PDF to Excel", path: "/pdf-to-excel" },
        { name: "Excel to PDF", path: "/excel-to-pdf" },
        { name: "CSV to JSON", path: "/csv-to-json" },
      ]}
    />
  );
}
