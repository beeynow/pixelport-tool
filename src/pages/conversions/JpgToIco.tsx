import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function JpgToIco() {
  return (
    <ConversionPage
      title="Free JPG to ICO Converter Online | Convert JPG to Icon | ConvertAny"
      description="Convert JPG to ICO format online for free. Create favicon icons from JPG images. Fast, secure, and easy with no sign-up required."
      keywords="jpg to ico, jpg to icon, favicon from jpg, create favicon, online jpg to ico"
      h1="JPG to ICO Converter"
      acceptedFiles=".jpg,.jpeg"
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
        { name: "PNG to ICO", path: "/png-to-ico" },
        { name: "ICO Converter", path: "/ico-converter" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Resize Image", path: "/resize-image" },
      ]}
    />
  );
}
