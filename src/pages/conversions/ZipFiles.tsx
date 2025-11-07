import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function ZipFiles() {
  return (
    <ConversionPage
      title="Free ZIP Files Online | Create ZIP Archive | ConvertAny"
      description="Create ZIP archives from multiple files online for free. Compress and combine files into ZIP format."
      keywords="zip files, create zip, compress files, zip archive, online zip creator"
      h1="ZIP Files"
      acceptedFiles="*"
      outputExtension="zip"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'application/zip' });
        downloadFile(blob, "archive.zip");
      }}
      relatedTools={[
        { name: "Unzip Files", path: "/unzip" },
        { name: "Compress ZIP", path: "/compress-zip" },
        { name: "Folder to ZIP", path: "/folder-to-zip" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
