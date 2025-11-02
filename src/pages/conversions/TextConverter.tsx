import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TextConverter() {
  return (
    <ConversionPage
      title="Free Text Case Converter Online | Uppercase, Lowercase, Title Case | ConvertAny"
      description="Convert text case online for free. Change to uppercase, lowercase, title case, and more. Fast and easy with no sign-up required."
      keywords="text converter, case converter, uppercase, lowercase, title case, online text converter"
      h1="Text Case Converter"
      acceptedFiles=".txt"
      outputExtension="txt"
      renderEditOptions={(files, setOptions) => {
        const [caseType, setCaseType] = useState<"upper" | "lower" | "title" | "sentence">("upper");

        const cases = [
          { label: "UPPERCASE", value: "upper" },
          { label: "lowercase", value: "lower" },
          { label: "Title Case", value: "title" },
          { label: "Sentence case", value: "sentence" },
        ];

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Conversion Type</Label>
              <div className="grid grid-cols-2 gap-3">
                {cases.map((caseOption) => (
                  <Button
                    key={caseOption.value}
                    variant={caseType === caseOption.value ? "default" : "outline"}
                    onClick={() => {
                      setCaseType(caseOption.value as any);
                      setOptions({ caseType: caseOption.value });
                    }}
                    className="w-full"
                  >
                    {caseOption.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      }}
      conversionHandler={async (files, options) => {
        const text = await files[0].text();
        const caseType = options?.caseType || "upper";
        
        let result = '';
        switch (caseType) {
          case "upper":
            result = text.toUpperCase();
            break;
          case "lower":
            result = text.toLowerCase();
            break;
          case "title":
            result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
            break;
          case "sentence":
            result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
            break;
        }
        
        const blob = new Blob([result], { type: 'text/plain' });
        downloadFile(blob, "converted.txt");
      }}
      relatedTools={[
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "Word Counter", path: "/word-counter" },
        { name: "URL Encode", path: "/url-encode" },
        { name: "Base64 Encode", path: "/base64-encode" },
      ]}
    />
  );
}
