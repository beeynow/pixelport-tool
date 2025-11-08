import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function OggToMp3() {
  return (
    <ConversionPage
      title="Free OGG to MP3 Converter Online | Convert OGG to MP3 | Convertany"
      description="Convert OGG to MP3 audio files online for free. Fast, secure, and easy OGG to MP3 conversion."
      keywords="ogg to mp3, convert ogg to mp3, ogg converter, online ogg to mp3"
      h1="OGG to MP3 Converter"
      acceptedFiles=".ogg"
      outputExtension="mp3"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/mp3' });
        downloadFile(blob, "converted.mp3");
      }}
      relatedTools={[
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "Audio to OGG", path: "/audio-to-ogg" },
        { name: "M4A to MP3", path: "/m4a-to-mp3" },
      ]}
    />
  );
}
