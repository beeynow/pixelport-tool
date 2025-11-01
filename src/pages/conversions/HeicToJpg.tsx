import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function HeicToJpg() {
  return (
    <ConversionPage
      title="Free HEIC to JPG Converter Online | Convert HEIC to JPEG | ConvertAny"
      description="Convert HEIC to JPG images online for free. Fast, secure, and easy HEIC to JPEG conversion with no sign-up required."
      keywords="heic to jpg, heic to jpeg, convert heic to jpg free, image converter, online heic to jpg"
      h1="HEIC to JPG Converter"
      acceptedFiles=".heic,.heif"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'jpeg');
        downloadFile(blob, "converted.jpg");
      }}
      relatedTools={[
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "WebP to JPG", path: "/webp-to-jpg" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
