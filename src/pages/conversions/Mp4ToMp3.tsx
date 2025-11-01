import ConversionPage from "@/components/ConversionPage";
import { convertVideoToAudio, downloadFile } from "@/lib/conversions";

export default function Mp4ToMp3() {
  return (
    <ConversionPage
      title="Free MP4 to MP3 Converter Online | Convert Video to Audio | ConvertAny"
      description="Convert MP4 to MP3 online for free. Extract audio from video files. Fast, secure, and easy with no sign-up required."
      keywords="mp4 to mp3, video to mp3, convert mp4 to mp3 free, extract audio, online mp4 to mp3"
      h1="MP4 to MP3 Converter"
      acceptedFiles=".mp4,.mov,.avi"
      outputExtension="mp3"
      conversionHandler={async (files) => {
        const blob = await convertVideoToAudio(files[0]);
        downloadFile(blob, "audio.mp3");
      }}
      relatedTools={[
        { name: "MP3 to WAV", path: "/mp3-to-wav" },
        { name: "WAV to MP3", path: "/wav-to-mp3" },
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
