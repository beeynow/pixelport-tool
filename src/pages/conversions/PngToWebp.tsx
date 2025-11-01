import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function PngToWebp() {
  return (
    <ConversionPage
      title="Free PNG to WebP Converter Online | Convert PNG to WebP | ConvertAny"
      description="Convert PNG to WebP images online for free. Fast, secure, and easy PNG to WebP conversion with no sign-up required."
      keywords="png to webp, convert png to webp free, image converter, online png to webp"
      h1="PNG to WebP Converter"
      acceptedFiles=".png"
      outputExtension="webp"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'webp');
        downloadFile(blob, "converted.webp");
      }}
      relatedTools={[
        { name: "JPG to WebP", path: "/jpg-to-webp" },
        { name: "WebP to PNG", path: "/webp-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
