import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import * as XLSX from "xlsx";

export default function JsonToCsv() {
  return (
    <ConversionPage
      title="Free JSON to CSV Converter Online | Convert JSON to CSV | ConvertAny"
      description="Convert JSON to CSV online for free. Fast, secure, and easy JSON to CSV conversion with no sign-up required."
      keywords="json to csv, convert json to csv free, json converter, online json to csv"
      h1="JSON to CSV Converter"
      acceptedFiles=".json"
      outputExtension="csv"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const jsonData = JSON.parse(text);
        const worksheet = XLSX.utils.json_to_sheet(Array.isArray(jsonData) ? jsonData : [jsonData]);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: 'text/csv' });
        downloadFile(blob, "converted.csv");
      }}
      relatedTools={[
        { name: "CSV to JSON", path: "/csv-to-json" },
        { name: "JSON to Excel", path: "/json-to-excel" },
        { name: "CSV to Excel", path: "/csv-to-excel" },
        { name: "Excel to CSV", path: "/excel-to-csv" },
      ]}
    />
  );
}
