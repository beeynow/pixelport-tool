import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function JpgToWebp() {
  return (
    <ConversionPage
      title="Free JPG to WebP Converter Online | Convert JPEG to WebP | ConvertAny"
      description="Convert JPG to WebP images online for free. Fast, secure, and easy JPEG to WebP conversion with no sign-up required."
      keywords="jpg to webp, jpeg to webp, convert jpg to webp free, image converter, online jpg to webp"
      h1="JPG to WebP Converter"
      acceptedFiles=".jpg,.jpeg"
      outputExtension="webp"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'webp');
        downloadFile(blob, "converted.webp");
      }}
      relatedTools={[
        { name: "PNG to WebP", path: "/png-to-webp" },
        { name: "WebP to JPG", path: "/webp-to-jpg" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
