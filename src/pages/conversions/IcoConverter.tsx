import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function IcoConverter() {
  return (
    <ConversionPage
      title="Free ICO Converter Online | Convert Images to ICO | ConvertAny"
      description="Convert images to ICO format online for free. Create favicon icons from JPG, PNG. Fast, secure, and easy with no sign-up required."
      keywords="ico converter, image to ico, favicon generator, create ico, online ico converter"
      h1="ICO Converter"
      acceptedFiles=".jpg,.jpeg,.png"
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
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "Resize Image", path: "/resize-image" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
