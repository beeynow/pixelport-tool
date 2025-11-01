import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function SvgToJpg() {
  return (
    <ConversionPage
      title="Free SVG to JPG Converter Online | Convert SVG to JPEG | ConvertAny"
      description="Convert SVG to JPG images online for free. Fast, secure, and easy SVG to JPEG conversion with no sign-up required."
      keywords="svg to jpg, svg to jpeg, convert svg to jpg free, vector to jpg, online svg to jpg"
      h1="SVG to JPG Converter"
      acceptedFiles=".svg"
      outputExtension="jpg"
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
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "converted.jpg");
        }, 'image/jpeg', 0.9);
        
        URL.revokeObjectURL(url);
      }}
      relatedTools={[
        { name: "SVG to PNG", path: "/svg-to-png" },
        { name: "JPG to SVG", path: "/image-to-svg" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
