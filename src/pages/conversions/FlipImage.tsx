import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function FlipImage() {
  return (
    <ConversionPage
      title="Free Image Flipper Online | Flip Images Horizontally/Vertically | ConvertAny"
      description="Flip images online for free. Fast, secure, and easy image flipping with no sign-up required."
      keywords="flip image, mirror image, image flipper, horizontal flip, vertical flip, online image flip"
      h1="Flip Image"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const file = files[0];
        const img = document.createElement('img');
        const url = URL.createObjectURL(file);
        
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = url;
        });
        
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d')!;
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "flipped.jpg");
        }, 'image/jpeg', 0.9);
        
        URL.revokeObjectURL(url);
      }}
      relatedTools={[
        { name: "Rotate Image", path: "/rotate-image" },
        { name: "Crop Image", path: "/crop-image" },
        { name: "Resize Image", path: "/resize-image" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
