import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function JsonToYaml() {
  return (
    <ConversionPage
      title="Free JSON to YAML Converter Online | Convert JSON to YAML | ConvertAny"
      description="Convert JSON to YAML online for free. Fast, secure, and easy JSON to YAML conversion with no sign-up required."
      keywords="json to yaml, convert json to yaml free, json converter, online json to yaml"
      h1="JSON to YAML Converter"
      acceptedFiles=".json"
      outputExtension="yaml"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const data = JSON.parse(text);
        const yaml = `# Converted from JSON\ndata: ${JSON.stringify(data)}`;
        const blob = new Blob([yaml], { type: 'text/yaml' });
        downloadFile(blob, "converted.yaml");
      }}
      relatedTools={[
        { name: "YAML to JSON", path: "/yaml-to-json" },
        { name: "XML to JSON", path: "/xml-to-json" },
        { name: "JSON to XML", path: "/json-to-xml" },
        { name: "JSON to CSV", path: "/json-to-csv" },
      ]}
    />
  );
}
