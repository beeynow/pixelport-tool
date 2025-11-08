import ConversionPage from "@/components/ConversionPage";
import { convertImageFormat, downloadFile } from "@/lib/conversions";

export default function GifToJpg() {
  return (
    <ConversionPage
      title="Free GIF to JPG Converter Online | Convert GIF to JPEG | Convertany"
      description="Convert GIF to JPG images online for free. Fast, secure, and easy GIF to JPEG conversion."
      keywords="gif to jpg, gif to jpeg, convert gif to jpg, gif converter"
      h1="GIF to JPG Converter"
      acceptedFiles=".gif"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = await convertImageFormat(files[0], 'jpeg');
        downloadFile(blob, "converted.jpg");
      }}
      relatedTools={[
        { name: "GIF to PNG", path: "/gif-to-png" },
        { name: "JPG to GIF", path: "/jpg-to-gif" },
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "GIF to Video", path: "/gif-to-video" },
      ]}
    />
  );
}
