import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function WebpToPng() {
  return (
    <ConversionPage
      title="Free WebP to PNG Converter Online | Convert WebP to PNG | ConvertAny"
      description="Convert WebP to PNG images online for free. Fast, secure, and easy WebP to PNG conversion with no sign-up required."
      keywords="webp to png, convert webp to png free, image converter, online webp to png"
      h1="WebP to PNG Converter"
      acceptedFiles=".webp"
      outputExtension="png"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'png');
        downloadFile(blob, "converted.png");
      }}
      relatedTools={[
        { name: "WebP to JPG", path: "/webp-to-jpg" },
        { name: "PNG to WebP", path: "/png-to-webp" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
