import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function TrimVideo() {
  return (
    <ConversionPage
      title="Free Video Trimmer Online | Trim & Cut Videos | ConvertAny"
      description="Trim and cut videos online for free. Fast, secure, and easy video trimming with no sign-up required."
      keywords="trim video, cut video, video trimmer, video cutter, online video trim"
      h1="Trim Video"
      acceptedFiles=".mp4,.mov,.avi,.mkv"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "trimmed.mp4");
      }}
      relatedTools={[
        { name: "Compress Video", path: "/compress-video" },
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Merge Videos", path: "/merge-video" },
      ]}
    />
  );
}
