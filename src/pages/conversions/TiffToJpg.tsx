import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function TiffToJpg() {
  return (
    <ConversionPage
      title="Free TIFF to JPG Converter Online | Convert TIFF to JPEG | ConvertAny"
      description="Convert TIFF to JPG images online for free. Fast, secure, and easy TIFF to JPEG conversion with no sign-up required."
      keywords="tiff to jpg, tiff to jpeg, convert tiff to jpg free, image converter, online tiff to jpg"
      h1="TIFF to JPG Converter"
      acceptedFiles=".tiff,.tif"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'jpeg');
        downloadFile(blob, "converted.jpg");
      }}
      relatedTools={[
        { name: "TIFF to PNG", path: "/tiff-to-png" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
