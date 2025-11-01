import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { PDFDocument } from "pdf-lib";

export default function CompressPdf() {
  return (
    <ConversionPage
      title="Free PDF Compressor Online | Reduce PDF File Size | ConvertAny"
      description="Compress PDF files online for free. Reduce PDF file size while maintaining quality. Fast, secure, and easy with no sign-up required."
      keywords="compress pdf, reduce pdf size, pdf compressor, shrink pdf, online pdf compression"
      h1="Compress PDF"
      acceptedFiles=".pdf"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const arrayBuffer = await files[0].arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        downloadFile(blob, "compressed.pdf");
      }}
      relatedTools={[
        { name: "Merge PDFs", path: "/merge-pdf" },
        { name: "Split PDF", path: "/split-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "PDF to Image", path: "/pdf-to-image" },
      ]}
    />
  );
}
