import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function GifToVideo() {
  return (
    <ConversionPage
      title="Free GIF to Video Converter Online | Convert GIF to MP4 | ConvertAny"
      description="Convert GIF to video online for free. Fast, secure, and easy GIF to MP4 conversion with no sign-up required."
      keywords="gif to video, gif to mp4, convert gif to video free, online gif to video"
      h1="GIF to Video Converter"
      acceptedFiles=".gif"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "video.mp4");
      }}
      relatedTools={[
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "Compress Video", path: "/compress-video" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Video Trim", path: "/trim-video" },
      ]}
    />
  );
}
