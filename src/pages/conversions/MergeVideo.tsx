import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function MergeVideo() {
  return (
    <ConversionPage
      title="Free Video Merger Online | Combine Video Files | ConvertAny"
      description="Merge video files online for free. Combine multiple videos into one. Fast, secure, and easy with no sign-up required."
      keywords="merge video, combine videos, video merger, join videos, online video merge"
      h1="Merge Videos"
      acceptedFiles=".mp4,.mov,.avi"
      multipleFiles={true}
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "merged.mp4");
      }}
      relatedTools={[
        { name: "Trim Video", path: "/trim-video" },
        { name: "Compress Video", path: "/compress-video" },
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
      ]}
    />
  );
}
