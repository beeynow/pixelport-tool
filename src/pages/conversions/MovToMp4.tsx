import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function MovToMp4() {
  return (
    <ConversionPage
      title="Free MOV to MP4 Converter Online | Convert MOV to MP4 | ConvertAny"
      description="Convert MOV to MP4 video format online for free. Fast and easy video conversion."
      keywords="mov to mp4, convert mov to mp4, video converter, online mov to mp4"
      h1="MOV to MP4 Converter"
      acceptedFiles=".mov"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "converted.mp4");
      }}
      relatedTools={[
        { name: "MP4 to AVI", path: "/mp4-to-avi" },
        { name: "AVI to MP4", path: "/avi-to-mp4" },
        { name: "Compress Video", path: "/compress-video" },
        { name: "Trim Video", path: "/trim-video" },
      ]}
    />
  );
}
