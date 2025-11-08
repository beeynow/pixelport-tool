import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function WebmToMp4() {
  return (
    <ConversionPage
      title="Free WebM to MP4 Converter Online | Convert WebM to MP4 | Convertany"
      description="Convert WebM to MP4 video files online for free. Fast, secure, and easy WebM to MP4 conversion."
      keywords="webm to mp4, convert webm to mp4, webm converter, online webm to mp4"
      h1="WebM to MP4 Converter"
      acceptedFiles=".webm"
      outputExtension="mp4"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'video/mp4' });
        downloadFile(blob, "converted.mp4");
      }}
      relatedTools={[
        { name: "MOV to MP4", path: "/mov-to-mp4" },
        { name: "AVI to MP4", path: "/avi-to-mp4" },
        { name: "MP4 to AVI", path: "/mp4-to-avi" },
        { name: "Compress Video", path: "/compress-video" },
      ]}
    />
  );
}
