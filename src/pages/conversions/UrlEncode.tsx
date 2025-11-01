import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function UrlEncode() {
  return (
    <ConversionPage
      title="Free URL Encoder Online | Encode URLs | ConvertAny"
      description="Encode URLs online for free. Fast, secure, and easy URL encoding with no sign-up required."
      keywords="url encode, encode url, url encoder, online url encode"
      h1="URL Encoder"
      acceptedFiles=".txt"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const encoded = encodeURIComponent(text);
        const blob = new Blob([encoded], { type: 'text/plain' });
        downloadFile(blob, "encoded.txt");
      }}
      relatedTools={[
        { name: "URL Decode", path: "/url-decode" },
        { name: "Base64 Encode", path: "/base64-encode" },
        { name: "Text to QR", path: "/text-to-qr" },
        { name: "Hash Generator", path: "/hash-generator" },
      ]}
    />
  );
}
