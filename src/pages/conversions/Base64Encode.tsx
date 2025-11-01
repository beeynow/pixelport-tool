import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function Base64Encode() {
  return (
    <ConversionPage
      title="Free Base64 Encoder Online | Encode to Base64 | ConvertAny"
      description="Encode files to Base64 online for free. Fast, secure, and easy Base64 encoding with no sign-up required."
      keywords="base64 encode, encode to base64, base64 encoder, online base64 encode"
      h1="Base64 Encoder"
      acceptedFiles="*"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const arrayBuffer = await files[0].arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        const base64 = btoa(binary);
        const blob = new Blob([base64], { type: 'text/plain' });
        downloadFile(blob, "encoded.txt");
      }}
      relatedTools={[
        { name: "Base64 Decode", path: "/base64-decode" },
        { name: "URL Encode", path: "/url-encode" },
        { name: "Text to QR", path: "/text-to-qr" },
        { name: "Hash Generator", path: "/hash-generator" },
      ]}
    />
  );
}
