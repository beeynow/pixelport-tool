import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function M4aToMp3() {
  return (
    <ConversionPage
      title="Free M4A to MP3 Converter Online | Convert M4A to MP3 | Convertany"
      description="Convert M4A to MP3 audio files online for free. Fast, secure, and easy M4A to MP3 conversion."
      keywords="m4a to mp3, convert m4a to mp3, m4a converter, online m4a to mp3"
      h1="M4A to MP3 Converter"
      acceptedFiles=".m4a"
      outputExtension="mp3"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/mp3' });
        downloadFile(blob, "converted.mp3");
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
