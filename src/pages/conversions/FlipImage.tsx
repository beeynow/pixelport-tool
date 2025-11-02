import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FlipHorizontal, FlipVertical } from "lucide-react";

export default function FlipImage() {
  return (
    <ConversionPage
      title="Free Image Flipper Online | Flip Images Horizontally/Vertically | ConvertAny"
      description="Flip images online for free. Fast, secure, and easy image flipping with no sign-up required."
      keywords="flip image, mirror image, image flipper, horizontal flip, vertical flip, online image flip"
      h1="Flip Image"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="jpg"
      renderEditOptions={(files, setOptions) => {
        const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Flip Direction</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={direction === "horizontal" ? "default" : "outline"}
                  onClick={() => {
                    setDirection("horizontal");
                    setOptions({ direction: "horizontal" });
                  }}
                  className="w-full"
                >
                  <FlipHorizontal className="w-4 h-4 mr-2" />
                  Horizontal
                </Button>
                <Button
                  variant={direction === "vertical" ? "default" : "outline"}
                  onClick={() => {
                    setDirection("vertical");
                    setOptions({ direction: "vertical" });
                  }}
                  className="w-full"
                >
                  <FlipVertical className="w-4 h-4 mr-2" />
                  Vertical
                </Button>
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
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d')!;
        const direction = options?.direction || "horizontal";
        
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (direction === "horizontal") {
          ctx.scale(-1, 1);
        } else {
          ctx.scale(1, -1);
        }
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
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
