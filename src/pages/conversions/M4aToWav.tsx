import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function M4aToWav() {
  return (
    <ConversionPage
      title="Free M4A to WAV Converter Online | Convert M4A to WAV | Convertany"
      description="Convert M4A to WAV audio files online for free. Fast, secure, and easy M4A to WAV conversion."
      keywords="m4a to wav, convert m4a to wav, m4a converter, online m4a to wav"
      h1="M4A to WAV Converter"
      acceptedFiles=".m4a"
      outputExtension="wav"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/wav' });
        downloadFile(blob, "converted.wav");
      }}
      relatedTools={[
        { name: "M4A to MP3", path: "/m4a-to-mp3" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "Compress Audio", path: "/compress-audio" },
      ]}
    />
  );
}
