import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function AacToMp3() {
  return (
    <ConversionPage
      title="Free AAC to MP3 Converter Online | Convert AAC to MP3 | Convertany"
      description="Convert AAC to MP3 audio files online for free. Fast, secure, and easy AAC to MP3 conversion."
      keywords="aac to mp3, convert aac to mp3, aac converter, online aac to mp3"
      h1="AAC to MP3 Converter"
      acceptedFiles=".aac"
      outputExtension="mp3"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/mp3' });
        downloadFile(blob, "converted.mp3");
      }}
      relatedTools={[
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "Audio to AAC", path: "/audio-to-aac" },
        { name: "M4A to MP3", path: "/m4a-to-mp3" },
      ]}
    />
  );
}
