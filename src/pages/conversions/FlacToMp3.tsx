import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function FlacToMp3() {
  return (
    <ConversionPage
      title="Free FLAC to MP3 Converter Online | Convert FLAC to MP3 | Convertany"
      description="Convert FLAC to MP3 audio files online for free. Fast, secure, and easy FLAC to MP3 conversion."
      keywords="flac to mp3, convert flac to mp3, flac converter, online flac to mp3"
      h1="FLAC to MP3 Converter"
      acceptedFiles=".flac"
      outputExtension="mp3"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/mp3' });
        downloadFile(blob, "converted.mp3");
      }}
      relatedTools={[
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "Audio to FLAC", path: "/audio-to-flac" },
        { name: "M4A to MP3", path: "/m4a-to-mp3" },
      ]}
    />
  );
}
