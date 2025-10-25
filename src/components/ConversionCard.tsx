import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useConversionTracking } from "@/hooks/useConversionTracking";
import { Loader2 } from "lucide-react";

interface ConversionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  acceptedFiles: string;
  multipleFiles?: boolean;
  onConvert: (files: File[]) => Promise<void>;
}

export const ConversionCard = ({
  icon: Icon,
  title,
  description,
  acceptedFiles,
  multipleFiles = false,
  onConvert,
}: ConversionCardProps) => {
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();
  const { trackConversion } = useConversionTracking();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsConverting(true);
      
      const tracked = await trackConversion();
      if (!tracked) {
        setIsConverting(false);
        return;
      }

      await onConvert(files);
      
      toast({
        title: "Success!",
        description: "File conversion completed successfully",
      });
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion failed",
        description: error instanceof Error ? error.message : "An error occurred during conversion",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
      e.target.value = "";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="file"
          accept={acceptedFiles}
          multiple={multipleFiles}
          onChange={handleFileChange}
          disabled={isConverting}
          className="cursor-pointer"
        />
        {isConverting && (
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Converting...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
