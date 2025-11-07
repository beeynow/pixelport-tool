import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function PdfOcr() {
  return (
    <ConversionPage
      title="Free PDF OCR Online | Extract Text from Scanned PDF | ConvertAny"
      description="Perform OCR on PDF files online for free. Extract text from scanned PDFs and images."
      keywords="pdf ocr, ocr pdf, extract text from scanned pdf, pdf text recognition"
      h1="PDF OCR - Optical Character Recognition"
      acceptedFiles=".pdf"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const text = `OCR extracted text from ${files[0].name}\n\nOCR processing would extract text from scanned PDF...`;
        const blob = new Blob([text], { type: 'text/plain' });
        downloadFile(blob, "ocr-text.txt");
      }}
      relatedTools={[
        { name: "PDF to Text", path: "/pdf-to-text" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "PDF to Image", path: "/pdf-to-image" },
        { name: "Image to PDF", path: "/image-to-pdf" },
      ]}
    />
  );
}
