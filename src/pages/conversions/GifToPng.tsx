import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function GifToPng() {
  return (
    <ConversionPage
      title="Free GIF to PNG Converter Online | Convert GIF to PNG | Convertany"
      description="Convert GIF to PNG images online for free. Fast, secure, and easy GIF to PNG conversion."
      keywords="gif to png, convert gif to png, gif converter, online gif to png"
      h1="GIF to PNG Converter"
      acceptedFiles=".gif"
      outputExtension="png"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'png');
        downloadFile(blob, "converted.png");
      }}
      relatedTools={[
        { name: "GIF to JPG", path: "/gif-to-jpg" },
        { name: "PNG to GIF", path: "/png-to-gif" },
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "GIF to Video", path: "/gif-to-video" },
      ]}
    />
  );
}
