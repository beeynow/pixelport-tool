import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function AudioToAac() {
  return (
    <ConversionPage
      title="Free Audio to AAC Converter Online | Convert to AAC | ConvertAny"
      description="Convert audio files to AAC format online for free. Fast and easy AAC conversion."
      keywords="audio to aac, convert to aac, aac converter, online aac conversion"
      h1="Audio to AAC Converter"
      acceptedFiles=".mp3,.wav,.m4a,.ogg,.flac"
      outputExtension="aac"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/aac' });
        downloadFile(blob, "converted.aac");
      }}
      relatedTools={[
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "Audio to OGG", path: "/audio-to-ogg" },
        { name: "Compress Audio", path: "/compress-audio" },
      ]}
    />
  );
}
