import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function Unzip() {
  return (
    <ConversionPage
      title="Free Unzip Files Online | Extract ZIP Archive | ConvertAny"
      description="Extract ZIP archives online for free. Unzip and decompress files easily."
      keywords="unzip files, extract zip, decompress zip, zip extractor, online unzip"
      h1="Unzip Files"
      acceptedFiles=".zip"
      outputExtension="folder"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()]);
        downloadFile(blob, "extracted-files.zip");
      }}
      relatedTools={[
        { name: "ZIP Files", path: "/zip-files" },
        { name: "Compress ZIP", path: "/compress-zip" },
        { name: "Folder to ZIP", path: "/folder-to-zip" },
        { name: "Batch Rename", path: "/batch-rename" },
      ]}
    />
  );
}
