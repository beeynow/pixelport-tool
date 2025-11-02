import ConversionPage from "@/components/ConversionPage";
import { compressImage, downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function CompressImage() {
  return (
    <ConversionPage
      title="Free Image Compressor Online | Reduce Image Size | ConvertAny"
      description="Compress images online for free. Reduce image file size while maintaining quality. Supports JPG, PNG, WebP. No sign-up required."
      keywords="compress image, reduce image size, image compressor, shrink image, online image compression"
      h1="Compress Image"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="jpg"
      renderEditOptions={(files, setOptions) => {
        const [quality, setQuality] = useState(80);

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Compression Quality</Label>
                <span className="text-2xl font-bold text-primary">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={(value) => {
                  setQuality(value[0]);
                  setOptions({ quality: value[0] / 100 });
                }}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>
          </div>
        );
      }}
      conversionHandler={async (files, options) => {
        const quality = options?.quality || 0.8;
        const blob = await compressImage(files[0], quality);
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
