import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function Mp4ToWebm() {
  return (
    <ConversionPage
      title="Free MP4 to WebM Converter Online | Convert MP4 to WebM | Convertany"
      description="Convert MP4 to WebM video files online for free. Fast, secure, and easy MP4 to WebM conversion."
      keywords="mp4 to webm, convert mp4 to webm, mp4 converter, online mp4 to webm"
      h1="MP4 to WebM Converter"
      acceptedFiles=".mp4"
      outputExtension="webm"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/webm' });
        downloadFile(blob, "converted.webm");
      }}
      relatedTools={[
        { name: "WebM to MP4", path: "/webm-to-mp4" },
        { name: "MP4 to AVI", path: "/mp4-to-avi" },
        { name: "MP4 to MP3", path: "/mp4-to-mp3" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
