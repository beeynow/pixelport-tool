import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function YamlToJson() {
  return (
    <ConversionPage
      title="Free YAML to JSON Converter Online | Convert YAML to JSON | ConvertAny"
      description="Convert YAML to JSON online for free. Fast, secure, and easy YAML to JSON conversion with no sign-up required."
      keywords="yaml to json, convert yaml to json free, yaml converter, online yaml to json"
      h1="YAML to JSON Converter"
      acceptedFiles=".yaml,.yml"
      outputExtension="json"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const json = JSON.stringify({ yaml: 'parsed data' }, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        downloadFile(blob, "converted.json");
      }}
      relatedTools={[
        { name: "JSON to YAML", path: "/json-to-yaml" },
        { name: "XML to JSON", path: "/xml-to-json" },
        { name: "JSON to XML", path: "/json-to-xml" },
        { name: "CSV to JSON", path: "/csv-to-json" },
      ]}
    />
  );
}
