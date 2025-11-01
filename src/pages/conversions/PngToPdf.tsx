import ConversionPage from "@/components/ConversionPage";
import { convertImagesToPdf, downloadFile } from "@/lib/conversions";

export default function PngToPdf() {
  return (
    <ConversionPage
      title="Free PNG to PDF Converter Online | Convert PNG to PDF | ConvertAny"
      description="Convert PNG to PDF online for free. Fast, secure, and easy PNG to PDF conversion with no sign-up required."
      keywords="png to pdf, convert png to pdf free, image to pdf, online png to pdf"
      h1="PNG to PDF Converter"
      acceptedFiles=".png"
      multipleFiles={true}
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const blob = await convertImagesToPdf(files);
        downloadFile(blob, "converted.pdf");
      }}
      relatedTools={[
        { name: "JPG to PDF", path: "/jpg-to-pdf" },
        { name: "PDF to Image", path: "/pdf-to-image" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
