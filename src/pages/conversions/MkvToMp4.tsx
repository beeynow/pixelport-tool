import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function MkvToMp4() {
  return (
    <ConversionPage
      title="Free MKV to MP4 Converter Online | Convert MKV to MP4 | Convertany"
      description="Convert MKV to MP4 video files online for free. Fast, secure, and easy MKV to MP4 conversion."
      keywords="mkv to mp4, convert mkv to mp4, mkv converter, online mkv to mp4"
      h1="MKV to MP4 Converter"
      acceptedFiles=".mkv"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "converted.mp4");
      }}
      relatedTools={[
        { name: "MOV to MP4", path: "/mov-to-mp4" },
        { name: "AVI to MP4", path: "/avi-to-mp4" },
        { name: "WebM to MP4", path: "/webm-to-mp4" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
