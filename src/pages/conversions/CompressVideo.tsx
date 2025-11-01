import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function CompressVideo() {
  return (
    <ConversionPage
      title="Free Video Compressor Online | Reduce Video File Size | ConvertAny"
      description="Compress video files online for free. Reduce video file size while maintaining quality. Fast, secure, and easy."
      keywords="compress video, reduce video size, video compressor, shrink video, online video compression"
      h1="Compress Video"
      acceptedFiles=".mp4,.mov,.avi,.mkv"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "compressed.mp4");
      }}
      relatedTools={[
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "Compress Audio", path: "/compress-audio" },
        { name: "Trim Video", path: "/trim-video" },
      ]}
    />
  );
}
