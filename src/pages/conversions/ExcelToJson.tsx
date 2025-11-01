import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import * as XLSX from "xlsx";

export default function ExcelToJson() {
  return (
    <ConversionPage
      title="Free Excel to JSON Converter Online | Convert XLSX to JSON | ConvertAny"
      description="Convert Excel to JSON online for free. Fast, secure, and easy XLSX to JSON conversion with no sign-up required."
      keywords="excel to json, xlsx to json, convert excel to json free, online excel to json"
      h1="Excel to JSON Converter"
      acceptedFiles=".xlsx,.xls"
      outputExtension="json"
      conversionHandler={async (files) => {
        const arrayBuffer = await files[0].arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        downloadFile(blob, "converted.json");
      }}
      relatedTools={[
        { name: "JSON to Excel", path: "/json-to-excel" },
        { name: "Excel to CSV", path: "/excel-to-csv" },
        { name: "CSV to JSON", path: "/csv-to-json" },
        { name: "PDF to Excel", path: "/pdf-to-excel" },
      ]}
    />
  );
}
