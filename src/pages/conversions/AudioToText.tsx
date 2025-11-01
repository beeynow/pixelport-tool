import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function AudioToText() {
  return (
    <ConversionPage
      title="Free Audio to Text Converter Online | Transcribe Audio | ConvertAny"
      description="Convert audio to text online for free. Transcribe audio files to text. Fast and easy with no sign-up required."
      keywords="audio to text, transcribe audio, speech to text, audio transcription, online audio to text"
      h1="Audio to Text Converter"
      acceptedFiles=".mp3,.wav,.m4a"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const text = `Audio transcription from ${files[0].name}\n\nTranscription will appear here...`;
        const blob = new Blob([text], { type: 'text/plain' });
        downloadFile(blob, "transcription.txt");
      }}
      relatedTools={[
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "Text to PDF", path: "/text-to-pdf" },
        { name: "Text to QR", path: "/text-to-qr" },
      ]}
    />
  );
}
