import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function VideoWatermark() {
  return (
    <ConversionPage
      title="Free Video Watermark Tool Online | Add Watermark to Video | ConvertAny"
      description="Add watermarks to video files online for free. Protect your videos with custom watermarks."
      keywords="video watermark, add watermark, watermark video, video branding"
      h1="Add Watermark to Video"
      acceptedFiles=".mp4,.mov,.avi,.mkv"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "watermarked-video.mp4");
      }}
      relatedTools={[
        { name: "Trim Video", path: "/trim-video" },
        { name: "Compress Video", path: "/compress-video" },
        { name: "Rotate Video", path: "/rotate-video" },
        { name: "Change Resolution", path: "/change-resolution" },
      ]}
    />
  );
}
