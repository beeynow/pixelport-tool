import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import * as XLSX from "xlsx";

export default function CsvToJson() {
  return (
    <ConversionPage
      title="Free CSV to JSON Converter Online | Convert CSV to JSON | ConvertAny"
      description="Convert CSV to JSON online for free. Fast, secure, and easy CSV to JSON conversion with no sign-up required."
      keywords="csv to json, convert csv to json free, csv converter, online csv to json"
      h1="CSV to JSON Converter"
      acceptedFiles=".csv"
      outputExtension="json"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const workbook = XLSX.read(text, { type: 'string' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        downloadFile(blob, "converted.json");
      }}
      relatedTools={[
        { name: "JSON to CSV", path: "/json-to-csv" },
        { name: "Excel to CSV", path: "/excel-to-csv" },
        { name: "CSV to Excel", path: "/csv-to-excel" },
        { name: "JSON to Excel", path: "/json-to-excel" },
      ]}
    />
  );
}
