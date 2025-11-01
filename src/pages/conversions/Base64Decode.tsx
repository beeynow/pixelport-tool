import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function Base64Decode() {
  return (
    <ConversionPage
      title="Free Base64 Decoder Online | Decode Base64 | ConvertAny"
      description="Decode Base64 files online for free. Fast, secure, and easy Base64 decoding with no sign-up required."
      keywords="base64 decode, decode base64, base64 decoder, online base64 decode"
      h1="Base64 Decoder"
      acceptedFiles=".txt"
      outputExtension="bin"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const binary = atob(text.trim());
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes]);
        downloadFile(blob, "decoded.bin");
      }}
      relatedTools={[
        { name: "Base64 Encode", path: "/base64-encode" },
        { name: "URL Decode", path: "/url-decode" },
        { name: "Hash Generator", path: "/hash-generator" },
        { name: "Text Converter", path: "/text-converter" },
      ]}
    />
  );
}
