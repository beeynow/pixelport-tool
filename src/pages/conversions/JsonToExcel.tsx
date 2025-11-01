import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import * as XLSX from "xlsx";

export default function JsonToExcel() {
  return (
    <ConversionPage
      title="Free JSON to Excel Converter Online | Convert JSON to XLSX | ConvertAny"
      description="Convert JSON to Excel online for free. Fast, secure, and easy JSON to XLSX conversion with no sign-up required."
      keywords="json to excel, json to xlsx, convert json to excel free, online json to excel"
      h1="JSON to Excel Converter"
      acceptedFiles=".json"
      outputExtension="xlsx"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const jsonData = JSON.parse(text);
        const worksheet = XLSX.utils.json_to_sheet(Array.isArray(jsonData) ? jsonData : [jsonData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        downloadFile(blob, "converted.xlsx");
      }}
      relatedTools={[
        { name: "Excel to JSON", path: "/excel-to-json" },
        { name: "JSON to CSV", path: "/json-to-csv" },
        { name: "CSV to Excel", path: "/csv-to-excel" },
        { name: "Excel to CSV", path: "/excel-to-csv" },
      ]}
    />
  );
}
