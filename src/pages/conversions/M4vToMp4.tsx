import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function M4vToMp4() {
  return (
    <ConversionPage
      title="Free M4V to MP4 Converter Online | Convert M4V to MP4 | Convertany"
      description="Convert M4V to MP4 video files online for free. Fast, secure, and easy M4V to MP4 conversion."
      keywords="m4v to mp4, convert m4v to mp4, m4v converter, online m4v to mp4"
      h1="M4V to MP4 Converter"
      acceptedFiles=".m4v"
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
