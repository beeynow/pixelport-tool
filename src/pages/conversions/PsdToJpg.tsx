import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function PsdToJpg() {
  return (
    <ConversionPage
      title="Free PSD to JPG Converter Online | Convert PSD to JPEG | Convertany"
      description="Convert PSD (Photoshop) to JPG images online for free. Fast, secure, and easy PSD to JPEG conversion."
      keywords="psd to jpg, psd to jpeg, convert psd to jpg, photoshop to jpg, psd converter"
      h1="PSD to JPG Converter"
      acceptedFiles=".psd"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'image/jpeg' });
        downloadFile(blob, "converted.jpg");
      }}
      relatedTools={[
        { name: "PSD to PNG", path: "/psd-to-png" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
