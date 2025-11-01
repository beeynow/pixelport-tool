import ConversionPage from "@/components/ConversionPage";
import { convertImagesToPdf, downloadFile } from "@/lib/conversions";

export default function JpgToPdf() {
  return (
    <ConversionPage
      title="Free JPG to PDF Converter Online | Convert JPEG to PDF | ConvertAny"
      description="Convert JPG to PDF online for free. Fast, secure, and easy JPEG to PDF conversion with no sign-up required."
      keywords="jpg to pdf, jpeg to pdf, convert jpg to pdf free, image to pdf, online jpg to pdf"
      h1="JPG to PDF Converter"
      acceptedFiles=".jpg,.jpeg"
      multipleFiles={true}
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const blob = await convertImagesToPdf(files);
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "PNG to PDF", path: "/png-to-pdf" },
        { name: "PDF to Image", path: "/pdf-to-image" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
