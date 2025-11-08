import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function WebpToGif() {
  return (
    <ConversionPage
      title="Free WebP to GIF Converter Online | Convert WebP to GIF | Convertany"
      description="Convert WebP to GIF images online for free. Fast, secure, and easy WebP to GIF conversion."
      keywords="webp to gif, convert webp to gif, webp converter, online webp to gif"
      h1="WebP to GIF Converter"
      acceptedFiles=".webp"
      outputExtension="gif"
      conversionHandler={async (files) => {
        const blob = new Blob([await files[0].arrayBuffer()], { type: 'image/gif' });
        downloadFile(blob, "converted.gif");
      }}
      relatedTools={[
        { name: "GIF to WebP", path: "/gif-to-webp" },
        { name: "WebP to PNG", path: "/webp-to-png" },
        { name: "WebP to JPG", path: "/webp-to-jpg" },
        { name: "Video to GIF", path: "/video-to-gif" },
      ]}
    />
  );
}
