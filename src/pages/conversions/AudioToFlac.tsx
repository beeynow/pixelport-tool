import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function AudioToFlac() {
  return (
    <ConversionPage
      title="Free Audio to FLAC Converter Online | Convert to FLAC | ConvertAny"
      description="Convert audio files to FLAC format online for free. Lossless audio conversion."
      keywords="audio to flac, convert to flac, flac converter, lossless audio conversion"
      h1="Audio to FLAC Converter"
      acceptedFiles=".mp3,.wav,.m4a,.aac,.ogg"
      outputExtension="flac"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/flac' });
        downloadFile(blob, "converted.flac");
      }}
      relatedTools={[
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "Audio to AAC", path: "/audio-to-aac" },
        { name: "Compress Audio", path: "/compress-audio" },
      ]}
    />
  );
}
