import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function JsonToXml() {
  return (
    <ConversionPage
      title="Free JSON to XML Converter Online | Convert JSON to XML | ConvertAny"
      description="Convert JSON to XML online for free. Fast, secure, and easy JSON to XML conversion with no sign-up required."
      keywords="json to xml, convert json to xml free, json converter, online json to xml"
      h1="JSON to XML Converter"
      acceptedFiles=".json"
      outputExtension="xml"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const data = JSON.parse(text);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>${JSON.stringify(data)}</root>`;
        const blob = new Blob([xml], { type: 'application/xml' });
        downloadFile(blob, "converted.xml");
      }}
      relatedTools={[
        { name: "XML to JSON", path: "/xml-to-json" },
        { name: "CSV to JSON", path: "/csv-to-json" },
        { name: "JSON to CSV", path: "/json-to-csv" },
        { name: "JSON to Excel", path: "/json-to-excel" },
      ]}
    />
  );
}
