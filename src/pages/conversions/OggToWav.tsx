import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function OggToWav() {
  return (
    <ConversionPage
      title="Free OGG to WAV Converter Online | Convert OGG to WAV | Convertany"
      description="Convert OGG to WAV audio files online for free. Fast, secure, and easy OGG to WAV conversion."
      keywords="ogg to wav, convert ogg to wav, ogg converter, online ogg to wav"
      h1="OGG to WAV Converter"
      acceptedFiles=".ogg"
      outputExtension="wav"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/wav' });
        downloadFile(blob, "converted.wav");
      }}
      relatedTools={[
        { name: "OGG to MP3", path: "/ogg-to-mp3" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "Audio to OGG", path: "/audio-to-ogg" },
      ]}
    />
  );
}
