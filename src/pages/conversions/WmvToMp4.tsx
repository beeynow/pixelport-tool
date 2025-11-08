import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function WmvToMp4() {
  return (
    <ConversionPage
      title="Free WMV to MP4 Converter Online | Convert WMV to MP4 | Convertany"
      description="Convert WMV to MP4 video files online for free. Fast, secure, and easy WMV to MP4 conversion."
      keywords="wmv to mp4, convert wmv to mp4, wmv converter, online wmv to mp4"
      h1="WMV to MP4 Converter"
      acceptedFiles=".wmv"
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
