import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function PngToIco() {
  return (
    <ConversionPage
      title="Free PNG to ICO Converter Online | Convert PNG to Icon | ConvertAny"
      description="Convert PNG to ICO format online for free. Create favicon icons from PNG images. Fast, secure, and easy with no sign-up required."
      keywords="png to ico, png to icon, favicon from png, create favicon, online png to ico"
      h1="PNG to ICO Converter"
      acceptedFiles=".png"
      outputExtension="ico"
      conversionHandler={async (files) => {
        const file = files[0];
        const img = document.createElement('img');
        const url = URL.createObjectURL(file);
        
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = url;
        });
        
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, 32, 32);
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "favicon.ico");
        }, 'image/x-icon');
        
        URL.revokeObjectURL(url);
      }}
      relatedTools={[
        { name: "ICO Converter", path: "/ico-converter" },
        { name: "JPG to ICO", path: "/jpg-to-ico" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Resize Image", path: "/resize-image" },
      ]}
    />
  );
}
