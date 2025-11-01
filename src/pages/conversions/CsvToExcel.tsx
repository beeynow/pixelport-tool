import ConversionPage from "@/components/ConversionPage";
import { convertCsvToExcel, downloadFile } from "@/lib/conversions";

export default function CsvToExcel() {
  return (
    <ConversionPage
      title="Free CSV to Excel Converter Online | Convert CSV to XLSX | ConvertAny"
      description="Convert CSV to Excel files online for free. Fast, secure, and easy CSV to XLSX conversion with no sign-up required."
      keywords="csv to excel, csv to xlsx, convert csv to excel free, csv converter, online csv to excel"
      h1="CSV to Excel Converter"
      acceptedFiles=".csv"
      outputExtension="xlsx"
      conversionHandler={async (files) => {
        const blob = await convertCsvToExcel(files[0]);
        downloadFile(blob, "converted.xlsx");
      }}
      relatedTools={[
        { name: "Excel to CSV", path: "/excel-to-csv" },
        { name: "PDF to Excel", path: "/pdf-to-excel" },
        { name: "CSV to JSON", path: "/csv-to-json" },
        { name: "JSON to CSV", path: "/json-to-csv" },
      ]}
    />
  );
}
