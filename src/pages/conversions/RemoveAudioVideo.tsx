import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function RemoveAudioVideo() {
  return (
    <ConversionPage
      title="Free Remove Audio from Video Online | Mute Video | ConvertAny"
      description="Remove audio from video files online for free. Create silent videos easily."
      keywords="remove audio from video, mute video, silent video, strip audio"
      h1="Remove Audio from Video"
      acceptedFiles=".mp4,.mov,.avi,.mkv"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "video-no-audio.mp4");
      }}
      relatedTools={[
        { name: "Extract Audio", path: "/extract-audio" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Merge Video", path: "/merge-video" },
        { name: "Trim Video", path: "/trim-video" },
      ]}
    />
  );
}
