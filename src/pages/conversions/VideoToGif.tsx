import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function VideoToGif() {
  return (
    <ConversionPage
      title="Free Video to GIF Converter Online | Convert MP4 to GIF | ConvertAny"
      description="Convert video to GIF online for free. Fast, secure, and easy video to GIF conversion with no sign-up required."
      keywords="video to gif, mp4 to gif, convert video to gif free, online video to gif"
      h1="Video to GIF Converter"
      acceptedFiles=".mp4,.mov,.avi"
      outputExtension="gif"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'image/gif' });
        downloadFile(blob, "video.gif");
      }}
      relatedTools={[
        { name: "GIF to Video", path: "/gif-to-video" },
        { name: "Compress Video", path: "/compress-video" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Trim Video", path: "/trim-video" },
      ]}
    />
  );
}
