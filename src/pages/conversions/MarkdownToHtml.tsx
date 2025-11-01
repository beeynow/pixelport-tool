import ConversionPage from "@/components/ConversionPage";
import { convertMarkdownToHtml, downloadFile } from "@/lib/conversions";

export default function MarkdownToHtml() {
  return (
    <ConversionPage
      title="Free Markdown to HTML Converter Online | Convert MD to HTML | ConvertAny"
      description="Convert Markdown to HTML online for free. Fast, secure, and easy MD to HTML conversion with no sign-up required."
      keywords="markdown to html, md to html, convert markdown to html free, markdown converter, online markdown to html"
      h1="Markdown to HTML Converter"
      acceptedFiles=".md,.markdown"
      outputExtension="html"
      conversionHandler={async (files) => {
        const blob = await convertMarkdownToHtml(files[0]);
        downloadFile(blob, "converted.html");
      }}
      relatedTools={[
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "HTML to PDF", path: "/html-to-pdf" },
        { name: "Word to PDF", path: "/word-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
      ]}
    />
  );
}
