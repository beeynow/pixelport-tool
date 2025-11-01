import ConversionPage from "@/components/ConversionPage";
import { splitPdf, downloadFile } from "@/lib/conversions";

export default function SplitPdf() {
  return (
    <ConversionPage
      title="Free PDF Splitter Online | Split PDF Pages | ConvertAny"
      description="Split PDF files online for free. Separate PDF pages into individual documents. Fast, secure, and easy with no sign-up required."
      keywords="split pdf, separate pdf pages, pdf splitter, divide pdf, online pdf split"
      h1="Split PDF"
      acceptedFiles=".pdf"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const blobs = await splitPdf(files[0]);
        blobs.forEach((blob, index) => {
          downloadFile(blob, `page-${index + 1}.pdf`);
        });
      }}
      relatedTools={[
        { name: "Merge PDFs", path: "/merge-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "PDF to Image", path: "/pdf-to-image" },
      ]}
    />
  );
}
