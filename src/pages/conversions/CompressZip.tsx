import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function CompressZip() {
  return (
    <ConversionPage
      title="Free ZIP Compressor Online | Compress ZIP Files | ConvertAny"
      description="Compress ZIP files online for free. Reduce ZIP archive size."
      keywords="compress zip, reduce zip size, zip compressor, shrink zip, online zip compression"
      h1="Compress ZIP"
      acceptedFiles=".zip"
      outputExtension="zip"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'application/zip' });
        downloadFile(blob, "compressed.zip");
      }}
      relatedTools={[
        { name: "ZIP Files", path: "/zip-files" },
        { name: "Unzip Files", path: "/unzip" },
        { name: "Compress PDF", path: "/compress-pdf" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
