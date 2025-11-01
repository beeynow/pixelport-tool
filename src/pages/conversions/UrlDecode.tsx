import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function UrlDecode() {
  return (
    <ConversionPage
      title="Free URL Decoder Online | Decode URLs | ConvertAny"
      description="Decode URLs online for free. Fast, secure, and easy URL decoding with no sign-up required."
      keywords="url decode, decode url, url decoder, online url decode"
      h1="URL Decoder"
      acceptedFiles=".txt"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const decoded = decodeURIComponent(text);
        const blob = new Blob([decoded], { type: 'text/plain' });
        downloadFile(blob, "decoded.txt");
      }}
      relatedTools={[
        { name: "URL Encode", path: "/url-encode" },
        { name: "Base64 Decode", path: "/base64-decode" },
        { name: "Text Converter", path: "/text-converter" },
        { name: "Hash Generator", path: "/hash-generator" },
      ]}
    />
  );
}
