import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function HashGenerator() {
  return (
    <ConversionPage
      title="Free Hash Generator Online | Generate MD5/SHA Hashes | ConvertAny"
      description="Generate file hashes online for free. Create MD5, SHA-1, SHA-256 hashes. Fast, secure, and easy with no sign-up required."
      keywords="hash generator, md5 generator, sha256, file hash, online hash generator"
      h1="Hash Generator"
      acceptedFiles="*"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const arrayBuffer = await files[0].arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        const result = `SHA-256: ${hashHex}\nFile: ${files[0].name}`;
        const blob = new Blob([result], { type: 'text/plain' });
        downloadFile(blob, "hash.txt");
      }}
      relatedTools={[
        { name: "Base64 Encode", path: "/base64-encode" },
        { name: "URL Encode", path: "/url-encode" },
        { name: "Text Converter", path: "/text-converter" },
        { name: "Password Generator", path: "/password-generator" },
      ]}
    />
  );
}
