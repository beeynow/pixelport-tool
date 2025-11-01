import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function WordCounter() {
  return (
    <ConversionPage
      title="Free Word Counter Online | Count Words & Characters | ConvertAny"
      description="Count words and characters online for free. Fast, secure, and easy word counting with no sign-up required."
      keywords="word counter, character counter, count words, text statistics, online word counter"
      h1="Word Counter"
      acceptedFiles=".txt,.doc,.docx"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const words = text.trim().split(/\s+/).length;
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const lines = text.split('\n').length;
        const result = `Word Count Statistics:\n\nWords: ${words}\nCharacters (with spaces): ${characters}\nCharacters (no spaces): ${charactersNoSpaces}\nLines: ${lines}`;
        const blob = new Blob([result], { type: 'text/plain' });
        downloadFile(blob, "stats.txt");
      }}
      relatedTools={[
        { name: "Text Converter", path: "/text-converter" },
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "PDF to Word", path: "/pdf-to-word" },
        { name: "Word to PDF", path: "/word-to-pdf" },
      ]}
    />
  );
}
