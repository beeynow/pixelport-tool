import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function ThreeGpToMp4() {
  return (
    <ConversionPage
      title="Free 3GP to MP4 Converter Online | Convert 3GP to MP4 | Convertany"
      description="Convert 3GP to MP4 video files online for free. Fast, secure, and easy 3GP to MP4 conversion."
      keywords="3gp to mp4, convert 3gp to mp4, 3gp converter, online 3gp to mp4"
      h1="3GP to MP4 Converter"
      acceptedFiles=".3gp"
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
