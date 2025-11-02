import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CropImage() {
  return (
    <ConversionPage
      title="Free Image Cropper Online | Crop Images | ConvertAny"
      description="Crop images online for free. Fast, secure, and easy image cropping with no sign-up required."
      keywords="crop image, image cropper, trim image, cut image, online image crop"
      h1="Crop Image"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="jpg"
      renderEditOptions={(files, setOptions) => {
        const [aspectRatio, setAspectRatio] = useState<"square" | "16:9" | "4:3" | "original">("square");

        const ratios = [
          { label: "Square (1:1)", value: "square" },
          { label: "Widescreen (16:9)", value: "16:9" },
          { label: "Standard (4:3)", value: "4:3" },
          { label: "Center Crop", value: "original" },
        ];

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Crop Aspect Ratio</Label>
              <div className="grid grid-cols-2 gap-3">
                {ratios.map((ratio) => (
                  <Button
                    key={ratio.value}
                    variant={aspectRatio === ratio.value ? "default" : "outline"}
                    onClick={() => {
                      setAspectRatio(ratio.value as any);
                      setOptions({ aspectRatio: ratio.value });
                    }}
                    className="w-full"
                  >
                    {ratio.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      }}
      conversionHandler={async (files, options) => {
        const file = files[0];
        const img = document.createElement('img');
        const url = URL.createObjectURL(file);
        
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = url;
        });
        
        const canvas = document.createElement('canvas');
        const ratio = options?.aspectRatio || "square";
        
        let cropWidth = img.width;
        let cropHeight = img.height;
        
        if (ratio === "square") {
          cropWidth = cropHeight = Math.min(img.width, img.height);
        } else if (ratio === "16:9") {
          if (img.width / img.height > 16 / 9) {
            cropWidth = img.height * (16 / 9);
            cropHeight = img.height;
          } else {
            cropWidth = img.width;
            cropHeight = img.width * (9 / 16);
          }
        } else if (ratio === "4:3") {
          if (img.width / img.height > 4 / 3) {
            cropWidth = img.height * (4 / 3);
            cropHeight = img.height;
          } else {
            cropWidth = img.width;
            cropHeight = img.width * (3 / 4);
          }
        }
        
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        
        const ctx = canvas.getContext('2d')!;
        const offsetX = (img.width - cropWidth) / 2;
        const offsetY = (img.height - cropHeight) / 2;
        ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        
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
