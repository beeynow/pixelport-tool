import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function CropImage() {
  return (
    <ConversionPage
      title="Free Image Cropper Online | Crop Images | ConvertAny"
      description="Crop images online for free. Fast, secure, and easy image cropping with no sign-up required."
      keywords="crop image, image cropper, trim image, cut image, online image crop"
      h1="Crop Image"
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
        const cropSize = Math.min(img.width, img.height);
        canvas.width = cropSize;
        canvas.height = cropSize;
        
        const ctx = canvas.getContext('2d')!;
        const offsetX = (img.width - cropSize) / 2;
        const offsetY = (img.height - cropSize) / 2;
        ctx.drawImage(img, offsetX, offsetY, cropSize, cropSize, 0, 0, cropSize, cropSize);
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "cropped.jpg");
        }, 'image/jpeg', 0.9);
        
        URL.revokeObjectURL(url);
      }}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
      ]}
    />
  );
}
