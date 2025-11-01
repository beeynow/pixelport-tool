import ConversionPage from "@/components/ConversionPage";
import { mergePdfs, downloadFile } from "@/lib/conversions";

export default function MergePdf() {
  return (
    <ConversionPage
      title="Free PDF Merger Online | Combine PDF Files | ConvertAny"
      description="Merge PDF files online for free. Combine multiple PDFs into one document. Fast, secure, and easy with no sign-up required."
      keywords="merge pdf, combine pdf, pdf merger, join pdf files, online pdf merge"
      h1="Merge PDF Files"
      acceptedFiles=".pdf"
      multipleFiles={true}
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const blob = await mergePdfs(files);
        downloadFile(blob, "merged.pdf");
      }}
      relatedTools={[
        { name: "Split PDF", path: "/split-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "PDF to Excel", path: "/pdf-to-excel" },
      ]}
    />
  );
}
