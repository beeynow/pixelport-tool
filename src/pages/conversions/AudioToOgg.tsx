import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function AudioToOgg() {
  return (
    <ConversionPage
      title="Free Audio to OGG Converter Online | Convert to OGG | ConvertAny"
      description="Convert audio files to OGG format online for free. Fast and easy OGG conversion."
      keywords="audio to ogg, convert to ogg, ogg converter, online ogg conversion"
      h1="Audio to OGG Converter"
      acceptedFiles=".mp3,.wav,.m4a,.aac,.flac"
      outputExtension="ogg"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/ogg' });
        downloadFile(blob, "converted.ogg");
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
