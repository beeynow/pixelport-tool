import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function RotateImage() {
  return (
    <ConversionPage
      title="Free Image Rotator Online | Rotate Images | ConvertAny"
      description="Rotate images online for free. Fast, secure, and easy image rotation with no sign-up required."
      keywords="rotate image, image rotator, flip image, turn image, online image rotate"
      h1="Rotate Image"
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
        canvas.width = img.height;
        canvas.height = img.width;
        
        const ctx = canvas.getContext('2d')!;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "rotated.jpg");
        }, 'image/jpeg', 0.9);
        
        URL.revokeObjectURL(url);
      }}
      relatedTools={[
        { name: "Crop Image", path: "/crop-image" },
        { name: "Resize Image", path: "/resize-image" },
        { name: "Flip Image", path: "/flip-image" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    />
  );
}
