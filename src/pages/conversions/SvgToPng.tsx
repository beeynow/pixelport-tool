import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function SvgToPng() {
  return (
    <ConversionPage
      title="Free SVG to PNG Converter Online | Convert SVG to PNG | ConvertAny"
      description="Convert SVG to PNG images online for free. Fast, secure, and easy SVG to PNG conversion with no sign-up required."
      keywords="svg to png, convert svg to png free, vector to png, online svg to png"
      h1="SVG to PNG Converter"
      acceptedFiles=".svg"
      outputExtension="png"
      conversionHandler={async (files) => {
        const text = await files[0].text();
        const blob = new Blob([text], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = url;
        });
        
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 800;
        canvas.height = img.height || 800;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "converted.png");
        }, 'image/png');
        
        URL.revokeObjectURL(url);
      }}
      relatedTools={[
        { name: "PNG to SVG", path: "/image-to-svg" },
        { name: "SVG to JPG", path: "/svg-to-jpg" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
