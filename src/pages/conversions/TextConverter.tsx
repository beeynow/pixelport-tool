import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function TextConverter() {
  return (
    <ConversionPage
      title="Free Text Case Converter Online | Uppercase, Lowercase, Title Case | ConvertAny"
      description="Convert text case online for free. Change to uppercase, lowercase, title case, and more. Fast and easy with no sign-up required."
      keywords="text converter, case converter, uppercase, lowercase, title case, online text converter"
      h1="Text Case Converter"
      acceptedFiles=".txt"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const uppercase = text.toUpperCase();
        const lowercase = text.toLowerCase();
        const titlecase = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        const result = `UPPERCASE:\n${uppercase}\n\nlowercase:\n${lowercase}\n\nTitle Case:\n${titlecase}`;
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
