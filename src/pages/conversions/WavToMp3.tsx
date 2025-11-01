import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function WavToMp3() {
  return (
    <ConversionPage
      title="Free WAV to MP3 Converter Online | Convert WAV to MP3 | ConvertAny"
      description="Convert WAV to MP3 audio online for free. Fast, secure, and easy WAV to MP3 conversion with no sign-up required."
      keywords="wav to mp3, convert wav to mp3 free, audio converter, online wav to mp3"
      h1="WAV to MP3 Converter"
      acceptedFiles=".wav"
      outputExtension="mp3"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/mp3' });
        downloadFile(blob, "audio.mp3");
      }}
      relatedTools={[
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Audio to Text", path: "/audio-to-text" },
        { name: "Compress Audio", path: "/compress-audio" },
      ]}
    />
  );
}
