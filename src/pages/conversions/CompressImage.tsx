import ConversionPage from "@/components/ConversionPage";
import { compressImage, downloadFile } from "@/lib/conversions";

export default function CompressImage() {
  return (
    <ConversionPage
      title="Free Image Compressor Online | Reduce Image Size | ConvertAny"
      description="Compress images online for free. Reduce image file size while maintaining quality. Supports JPG, PNG, WebP. No sign-up required."
      keywords="compress image, reduce image size, image compressor, shrink image, online image compression"
      h1="Compress Image"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="jpg"
      conversionHandler={async (files) => {
        const blob = await compressImage(files[0], 0.8);
        downloadFile(blob, "compressed.jpg");
      }}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "WebP to JPG", path: "/webp-to-jpg" },
      ]}
    />
  );
}
