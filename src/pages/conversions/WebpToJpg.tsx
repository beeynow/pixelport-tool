import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function WebpToJpg() {
  return (
    <ConversionPage
      title="Free WebP to JPG Converter Online | Convert WebP to JPEG | ConvertAny"
      description="Convert WebP to JPG images online for free. Fast, secure, and easy WebP to JPEG conversion with no sign-up required."
      keywords="webp to jpg, webp to jpeg, convert webp to jpg free, image converter, online webp to jpg"
      h1="WebP to JPG Converter"
      acceptedFiles=".webp"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'jpeg');
        downloadFile(blob, "converted.jpg");
      }}
      relatedTools={[
        { name: "WebP to PNG", path: "/webp-to-png" },
        { name: "JPG to WebP", path: "/jpg-to-webp" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
