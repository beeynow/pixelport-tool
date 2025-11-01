import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function JpgToPng() {
  return (
    <ConversionPage
      title="Free JPG to PNG Converter Online | Convert JPEG to PNG | ConvertAny"
      description="Convert JPG to PNG images online for free. Fast, secure, and easy JPEG to PNG conversion with no sign-up required."
      keywords="jpg to png, jpeg to png, convert jpg to png free, image converter, online jpg to png"
      h1="JPG to PNG Converter"
      acceptedFiles=".jpg,.jpeg"
      outputExtension="png"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'png');
        downloadFile(blob, "converted.png");
      }}
      relatedTools={[
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "WebP to PNG", path: "/webp-to-png" },
        { name: "HEIC to JPG", path: "/heic-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
