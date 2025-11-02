import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResizeImage() {
  return (
    <ConversionPage
      title="Free Image Resizer Online | Resize Images | ConvertAny"
      description="Resize images online for free. Fast, secure, and easy image resizing with no sign-up required."
      keywords="resize image, image resizer, scale image, resize photo, online image resize"
      h1="Resize Image"
      acceptedFiles=".jpg,.jpeg,.png,.webp"
      outputExtension="jpg"
      renderEditOptions={(files, setOptions) => {
        const [width, setWidth] = useState<number>(1920);
        const [height, setHeight] = useState<number>(1080);
        const [maintainAspect, setMaintainAspect] = useState(true);

        const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newWidth = parseInt(e.target.value) || 0;
          setWidth(newWidth);
          if (maintainAspect && files[0]) {
            const img = new Image();
            img.src = URL.createObjectURL(files[0]);
            img.onload = () => {
              const ratio = img.height / img.width;
              setHeight(Math.round(newWidth * ratio));
            };
          }
          setOptions({ width: newWidth, height, maintainAspect });
        };

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  min="1"
                  max="4096"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => {
                    const newHeight = parseInt(e.target.value) || 0;
                    setHeight(newHeight);
                    setOptions({ width, height: newHeight, maintainAspect });
                  }}
                  min="1"
                  max="4096"
                  disabled={maintainAspect}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                variant={maintainAspect ? "default" : "outline"}
                onClick={() => {
                  setMaintainAspect(true);
                  setOptions({ width, height, maintainAspect: true });
                }}
              >
                Maintain Aspect Ratio
              </Button>
              <Button
                variant={!maintainAspect ? "default" : "outline"}
                onClick={() => {
                  setMaintainAspect(false);
                  setOptions({ width, height, maintainAspect: false });
                }}
              >
                Custom Size
              </Button>
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
        const targetWidth = options?.width || 1920;
        const targetHeight = options?.height || 1080;
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        canvas.toBlob((blob) => {
          downloadFile(blob!, "resized.jpg");
        }, 'image/jpeg', 0.9);
        
        URL.revokeObjectURL(url);
      }}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
        { name: "PNG to JPG", path: "/png-to-jpg" },
        { name: "Crop Image", path: "/crop-image" },
      ]}
    />
  );
}
