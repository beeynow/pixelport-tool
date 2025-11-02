import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RotateCw } from "lucide-react";

export default function RotateImage() {
  return (
    <ConversionPage
      title="Free Image Rotator Online | Rotate Images | ConvertAny"
      description="Rotate images online for free. Fast, secure, and easy image rotation with no sign-up required."
      keywords="rotate image, image rotator, flip image, turn image, online image rotate"
      h1="Rotate Image"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="jpg"
      renderEditOptions={(files, setOptions) => {
        const [angle, setAngle] = useState(90);

        const angles = [90, 180, 270];

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Rotation Angle</Label>
              <div className="grid grid-cols-3 gap-3">
                {angles.map((deg) => (
                  <Button
                    key={deg}
                    variant={angle === deg ? "default" : "outline"}
                    onClick={() => {
                      setAngle(deg);
                      setOptions({ angle: deg });
                    }}
                    className="w-full"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    {deg}°
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
        
        const angle = options?.angle || 90;
        const canvas = document.createElement('canvas');
        
        if (angle === 90 || angle === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        const ctx = canvas.getContext('2d')!;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle * Math.PI / 180);
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
