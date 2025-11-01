import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function CompressAudio() {
  return (
    <ConversionPage
      title="Free Audio Compressor Online | Reduce Audio File Size | ConvertAny"
      description="Compress audio files online for free. Reduce audio file size while maintaining quality. Fast, secure, and easy."
      keywords="compress audio, reduce audio size, audio compressor, shrink audio, online audio compression"
      h1="Compress Audio"
      acceptedFiles=".mp3,.wav,.m4a"
      outputExtension="mp3"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'audio/mp3' });
        downloadFile(blob, "compressed.mp3");
      }}
      relatedTools={[
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
