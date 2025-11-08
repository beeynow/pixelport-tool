import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function FlvToMp4() {
  return (
    <ConversionPage
      title="Free FLV to MP4 Converter Online | Convert FLV to MP4 | Convertany"
      description="Convert FLV to MP4 video files online for free. Fast, secure, and easy FLV to MP4 conversion."
      keywords="flv to mp4, convert flv to mp4, flv converter, online flv to mp4"
      h1="FLV to MP4 Converter"
      acceptedFiles=".flv"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "converted.mp4");
      }}
      relatedTools={[
        { name: "MOV to MP4", path: "/mov-to-mp4" },
        { name: "AVI to MP4", path: "/avi-to-mp4" },
        { name: "MKV to MP4", path: "/mkv-to-mp4" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
