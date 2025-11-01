import ConversionPage from "@/components/ConversionPage";
import { convertPdfToImages, downloadFile } from "@/lib/conversions";

export default function PdfToImage() {
  return (
    <ConversionPage
      title="Free PDF to Image Converter Online | Convert PDF to JPG/PNG | ConvertAny"
      description="Convert PDF to images online for free. Fast, secure, and easy PDF to JPG/PNG conversion with no sign-up required."
      keywords="pdf to image, pdf to jpg, pdf to png, convert pdf to image free, online pdf to image"
      h1="PDF to Image Converter"
      acceptedFiles=".pdf"
      outputExtension="png"
      conversionHandler={async (files) => {
        const blobs = await convertPdfToImages(files[0]);
        blobs.forEach((blob, index) => {
          downloadFile(blob, `page-${index + 1}.png`);
        });
      }}
      relatedTools={[
        { name: "JPG to PDF", path: "/jpg-to-pdf" },
        { name: "PNG to PDF", path: "/png-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
