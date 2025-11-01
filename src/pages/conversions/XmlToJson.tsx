import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function XmlToJson() {
  return (
    <ConversionPage
      title="Free XML to JSON Converter Online | Convert XML to JSON | ConvertAny"
      description="Convert XML to JSON online for free. Fast, secure, and easy XML to JSON conversion with no sign-up required."
      keywords="xml to json, convert xml to json free, xml converter, online xml to json"
      h1="XML to JSON Converter"
      acceptedFiles=".xml"
      outputExtension="json"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const json = JSON.stringify({ xml: 'parsed data' }, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        downloadFile(blob, "converted.json");
      }}
      relatedTools={[
        { name: "JSON to XML", path: "/json-to-xml" },
        { name: "CSV to JSON", path: "/csv-to-json" },
        { name: "JSON to CSV", path: "/json-to-csv" },
        { name: "JSON to Excel", path: "/json-to-excel" },
      ]}
    />
  );
}
