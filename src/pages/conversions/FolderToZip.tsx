import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function FolderToZip() {
  return (
    <ConversionPage
      title="Free Folder to ZIP Converter Online | Compress Folder | ConvertAny"
      description="Convert folders to ZIP archives online for free. Compress entire folders into ZIP format."
      keywords="folder to zip, compress folder, folder zipper, directory to zip, online folder compression"
      h1="Folder to ZIP"
      acceptedFiles="*"
      outputExtension="zip"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'application/zip' });
        downloadFile(blob, "folder.zip");
      }}
      relatedTools={[
        { name: "ZIP Files", path: "/zip-files" },
        { name: "Unzip Files", path: "/unzip" },
        { name: "Compress ZIP", path: "/compress-zip" },
        { name: "Batch Rename", path: "/batch-rename" },
      ]}
    />
  );
}
