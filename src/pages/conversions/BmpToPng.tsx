import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function BmpToPng() {
  return (
    <ConversionPage
      title="Free BMP to PNG Converter Online | Convert BMP to PNG | ConvertAny"
      description="Convert BMP to PNG images online for free. Fast, secure, and easy BMP to PNG conversion with no sign-up required."
      keywords="bmp to png, convert bmp to png free, image converter, online bmp to png"
      h1="BMP to PNG Converter"
      acceptedFiles=".bmp"
      outputExtension="png"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'png');
        downloadFile(blob, "converted.png");
      }}
      relatedTools={[
        { name: "BMP to JPG", path: "/bmp-to-jpg" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
