import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import QRCode from "qrcode";

export default function TextToQr() {
  return (
    <ConversionPage
      title="Free Text to QR Code Generator Online | Create QR Codes | ConvertAny"
      description="Generate QR codes from text online for free. Fast, secure, and easy text to QR code conversion with no sign-up required."
      keywords="text to qr, qr code generator, create qr code, text to qr code free, online qr generator"
      h1="Text to QR Code Generator"
      acceptedFiles=".txt"
      outputExtension="png"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const qrDataUrl = await QRCode.toDataURL(text, {
          width: 600,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        const response = await fetch(qrDataUrl);
        const blob = await response.blob();
        downloadFile(blob, "qrcode.png");
      }}
      relatedTools={[
        { name: "Image to PDF", path: "/jpg-to-pdf" },
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
      ]}
    />
  );
}
