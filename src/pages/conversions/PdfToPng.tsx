import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToPng() {
  return (
    <ConversionPage
      title="Free PDF to PNG Converter Online | Convert PDF to PNG | Convertany"
      description="Convert PDF to PNG images online for free. Fast, secure, and easy PDF to PNG conversion."
      keywords="pdf to png, convert pdf to png, pdf converter, online pdf to png"
      h1="PDF to PNG Converter"
      acceptedFiles=".pdf"
      outputExtension="png"
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
          downloadFile(blob!, "converted.png");
        }, 'image/png');
      }}
      relatedTools={[
        { name: "PDF to JPG", path: "/pdf-to-jpg" },
        { name: "PDF to Image", path: "/pdf-to-image" },
        { name: "PNG to PDF", path: "/png-to-pdf" },
        { name: "Compress PDF", path: "/compress-pdf" },
      ]}
    />
  );
}
