import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import jsPDF from "jspdf";

export default function TiffToPdf() {
  return (
    <ConversionPage
      title="Free TIFF to PDF Converter Online | Convert TIFF to PDF | Convertany"
      description="Convert TIFF to PDF files online for free. Fast, secure, and easy TIFF to PDF conversion."
      keywords="tiff to pdf, convert tiff to pdf, tiff converter, online tiff to pdf"
      h1="TIFF to PDF Converter"
      acceptedFiles=".tiff,.tif"
      outputExtension="pdf"
      conversionHandler={async (files) => {
        const pdf = new jsPDF();
        
        // Read the TIFF file
        const reader = new FileReader();
        reader.onload = async (e) => {
          const dataUrl = e.target?.result as string;
          
          // Add image to PDF
          const img = new Image();
          img.src = dataUrl;
          await new Promise((resolve) => { img.onload = resolve; });
          
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
          const width = img.width * ratio;
          const height = img.height * ratio;
          
          pdf.addImage(dataUrl, 'TIFF', 0, 0, width, height);
          const blob = pdf.output('blob');
          downloadFile(blob, "converted.pdf");
        };
        reader.readAsDataURL(files[0]);
      }}
      relatedTools={[
        { name: "TIFF to JPG", path: "/tiff-to-jpg" },
        { name: "TIFF to PNG", path: "/tiff-to-png" },
        { name: "Image to PDF", path: "/image-to-pdf" },
        { name: "PDF to Image", path: "/pdf-to-image" },
      ]}
    />
  );
}
