import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function AviToMp4() {
  return (
    <ConversionPage
      title="Free AVI to MP4 Converter Online | Convert AVI to MP4 | ConvertAny"
      description="Convert AVI to MP4 video format online for free. Fast and easy video conversion."
      keywords="avi to mp4, convert avi to mp4, video converter, online avi to mp4"
      h1="AVI to MP4 Converter"
      acceptedFiles=".avi"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "converted.mp4");
      }}
      relatedTools={[
        { name: "MP4 to AVI", path: "/mp4-to-avi" },
        { name: "MOV to MP4", path: "/mov-to-mp4" },
        { name: "Compress Video", path: "/compress-video" },
        { name: "Trim Video", path: "/trim-video" },
      ]}
    />
  );
}
