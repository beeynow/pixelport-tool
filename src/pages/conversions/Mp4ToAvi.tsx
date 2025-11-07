import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function Mp4ToAvi() {
  return (
    <ConversionPage
      title="Free MP4 to AVI Converter Online | Convert MP4 to AVI | ConvertAny"
      description="Convert MP4 to AVI video format online for free. Fast and easy video conversion."
      keywords="mp4 to avi, convert mp4 to avi, video converter, online mp4 to avi"
      h1="MP4 to AVI Converter"
      acceptedFiles=".mp4"
      outputExtension="avi"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/x-msvideo' });
        downloadFile(blob, "converted.avi");
      }}
      relatedTools={[
        { name: "AVI to MP4", path: "/avi-to-mp4" },
        { name: "MOV to MP4", path: "/mov-to-mp4" },
        { name: "Compress Video", path: "/compress-video" },
        { name: "Trim Video", path: "/trim-video" },
      ]}
    />
  );
}
