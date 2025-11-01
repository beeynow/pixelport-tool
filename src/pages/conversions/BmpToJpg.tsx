import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function BmpToJpg() {
  return (
    <ConversionPage
      title="Free BMP to JPG Converter Online | Convert BMP to JPEG | ConvertAny"
      description="Convert BMP to JPG images online for free. Fast, secure, and easy BMP to JPEG conversion with no sign-up required."
      keywords="bmp to jpg, bmp to jpeg, convert bmp to jpg free, image converter, online bmp to jpg"
      h1="BMP to JPG Converter"
      acceptedFiles=".bmp"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'jpeg');
        downloadFile(blob, "converted.jpg");
      }}
      relatedTools={[
        { name: "BMP to PNG", path: "/bmp-to-png" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
