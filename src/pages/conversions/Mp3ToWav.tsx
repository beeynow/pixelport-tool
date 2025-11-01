import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function Mp3ToWav() {
  return (
    <ConversionPage
      title="Free MP3 to WAV Converter Online | Convert MP3 to WAV | ConvertAny"
      description="Convert MP3 to WAV audio online for free. Fast, secure, and easy MP3 to WAV conversion with no sign-up required."
      keywords="mp3 to wav, convert mp3 to wav free, audio converter, online mp3 to wav"
      h1="MP3 to WAV Converter"
      acceptedFiles=".mp3"
      outputExtension="wav"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/wav' });
        downloadFile(blob, "audio.wav");
      }}
      relatedTools={[
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Audio to Text", path: "/audio-to-text" },
        { name: "Compress Audio", path: "/compress-audio" },
      ]}
    />
  );
}
