import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function PsdToPng() {
  return (
    <ConversionPage
      title="Free PSD to PNG Converter Online | Convert PSD to PNG | Convertany"
      description="Convert PSD (Photoshop) to PNG images online for free. Fast, secure, and easy PSD to PNG conversion."
      keywords="psd to png, convert psd to png, photoshop to png, psd converter"
      h1="PSD to PNG Converter"
      acceptedFiles=".psd"
      outputExtension="png"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'image/png' });
        downloadFile(blob, "converted.png");
      }}
      relatedTools={[
        { name: "PSD to JPG", path: "/psd-to-jpg" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
