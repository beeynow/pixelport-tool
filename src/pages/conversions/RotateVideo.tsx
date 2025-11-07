import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function RotateVideo() {
  return (
    <ConversionPage
      title="Free Video Rotator Online | Rotate Video | ConvertAny"
      description="Rotate video files online for free. Fix video orientation easily."
      keywords="rotate video, video rotator, flip video, change video orientation"
      h1="Rotate Video"
      acceptedFiles=".mp4,.mov,.avi,.mkv"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "rotated-video.mp4");
      }}
      relatedTools={[
        { name: "Rotate Image", path: "/rotate-image" },
        { name: "Flip Image", path: "/flip-image" },
        { name: "Trim Video", path: "/trim-video" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
