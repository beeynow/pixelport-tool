import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToJpg() {
  return (
    <ConversionPage
      title="Free PDF to JPG Converter Online | Convert PDF to JPEG | Convertany"
      description="Convert PDF to JPG images online for free. Fast, secure, and easy PDF to JPEG conversion."
      keywords="pdf to jpg, pdf to jpeg, convert pdf to jpg, pdf converter"
      h1="PDF to JPG Converter"
      acceptedFiles=".pdf"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const arrayBuffer = await files[0].arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        
        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({ 
          canvasContext: context as any, 
          viewport,
          canvas 
        } as any).promise;
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "converted.jpg");
        }, 'image/jpeg', 0.9);
      }}
      relatedTools={[
        { name: "PDF to PNG", path: "/pdf-to-png" },
        { name: "PDF to Image", path: "/pdf-to-image" },
        { name: "JPG to PDF", path: "/jpg-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
