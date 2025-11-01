import ConversionPage from "@/components/ConversionPage";
import { convertImageToSvg, downloadFile } from "@/lib/conversions";

export default function ImageToSvg() {
  return (
    <ConversionPage
      title="Free Image to SVG Converter Online | Convert JPG/PNG to SVG | ConvertAny"
      description="Convert images to SVG online for free. Fast, secure, and easy image to SVG conversion with no sign-up required."
      keywords="image to svg, jpg to svg, png to svg, convert image to svg free, online image to svg"
      h1="Image to SVG Converter"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="svg"
      conversionHandler={async (files) => {
        const blob = await convertImageToSvg(files[0]);
        downloadFile(blob, "converted.svg");
      }}
      relatedTools={[
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Image to PDF", path: "/jpg-to-pdf" },
      ]}
    />
  );
}
