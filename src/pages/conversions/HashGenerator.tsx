import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function HashGenerator() {
  return (
    <ConversionPage
      title="Free Hash Generator Online | Generate MD5/SHA Hashes | ConvertAny"
      description="Generate file hashes online for free. Create MD5, SHA-1, SHA-256 hashes. Fast, secure, and easy with no sign-up required."
      keywords="hash generator, md5 generator, sha256, file hash, online hash generator"
      h1="Hash Generator"
      acceptedFiles="*"
      outputExtension="txt"
      renderEditOptions={(files, setOptions) => {
        const [algorithm, setAlgorithm] = useState<"SHA-1" | "SHA-256" | "SHA-384" | "SHA-512">("SHA-256");

        const algorithms: Array<"SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"> = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Hash Algorithm</Label>
              <div className="grid grid-cols-2 gap-3">
                {algorithms.map((algo) => (
                  <Button
                    key={algo}
                    variant={algorithm === algo ? "default" : "outline"}
                    onClick={() => {
                      setAlgorithm(algo);
                      setOptions({ algorithm: algo });
                    }}
                    className="w-full"
                  >
                    {algo}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      }}
      conversionHandler={async (files, options) => {
        const algorithm = options?.algorithm || "SHA-256";
        const arrayBuffer = await files[0].arrayBuffer();
        const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        const result = `${algorithm}: ${hashHex}\nFile: ${files[0].name}`;
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
