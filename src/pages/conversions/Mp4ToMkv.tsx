import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function Mp4ToMkv() {
  return (
    <ConversionPage
      title="Free MP4 to MKV Converter Online | Convert MP4 to MKV | Convertany"
      description="Convert MP4 to MKV video files online for free. Fast, secure, and easy MP4 to MKV conversion."
      keywords="mp4 to mkv, convert mp4 to mkv, mp4 converter, online mp4 to mkv"
      h1="MP4 to MKV Converter"
      acceptedFiles=".mp4"
      outputExtension="mkv"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/x-matroska' });
        downloadFile(blob, "converted.mkv");
      }}
      relatedTools={[
        { name: "MKV to MP4", path: "/mkv-to-mp4" },
        { name: "MP4 to AVI", path: "/mp4-to-avi" },
        { name: "MP4 to WebM", path: "/mp4-to-webm" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
