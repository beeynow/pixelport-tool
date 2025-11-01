import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function PngToJpg() {
  return (
    <ConversionPage
      title="Free PNG to JPG Converter Online | Convert PNG to JPEG | ConvertAny"
      description="Convert PNG to JPG images online for free. Fast, secure, and easy PNG to JPEG conversion with no sign-up required."
      keywords="png to jpg, png to jpeg, convert png to jpg free, image converter, online png to jpg"
      h1="PNG to JPG Converter"
      acceptedFiles=".png"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'jpeg');
        downloadFile(blob, "converted.jpg");
      }}
      relatedTools={[
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "WebP to JPG", path: "/webp-to-jpg" },
        { name: "HEIC to JPG", path: "/heic-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
