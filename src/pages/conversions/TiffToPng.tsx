import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function TiffToPng() {
  return (
    <ConversionPage
      title="Free TIFF to PNG Converter Online | Convert TIFF to PNG | ConvertAny"
      description="Convert TIFF to PNG images online for free. Fast, secure, and easy TIFF to PNG conversion with no sign-up required."
      keywords="tiff to png, convert tiff to png free, image converter, online tiff to png"
      h1="TIFF to PNG Converter"
      acceptedFiles=".tiff,.tif"
      outputExtension="png"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'png');
        downloadFile(blob, "converted.png");
      }}
      relatedTools={[
        { name: "TIFF to JPG", path: "/tiff-to-jpg" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
