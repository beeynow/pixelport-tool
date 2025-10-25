import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  FileSpreadsheet, 
  FileText,
  Combine,
  Split,
  Minimize2,
  ArrowUpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { CONVERSION_LIMITS } from "@/lib/clerk";
import { useConversionTracking } from "@/hooks/useConversionTracking";
import { ConversionCard } from "@/components/ConversionCard";
import * as conversions from "@/lib/conversions";

const Dashboard = () => {
  const { user } = useUser();
  const [conversionCount, setConversionCount] = useState(0);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'premium'>('free');
  const { getConversionStats } = useConversionTracking();

  useEffect(() => {
    loadStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    const stats = await getConversionStats();
    if (stats) {
      setConversionCount(stats.conversions_today);
      setSubscriptionTier(stats.subscription_tier as 'free' | 'premium');
    }
  };

  const isPremium = subscriptionTier === 'premium';
  const limits = isPremium ? CONVERSION_LIMITS.PREMIUM : CONVERSION_LIMITS.FREE;

  const handleImagesToPdf = async (files: File[]) => {
    const blob = await conversions.convertImagesToPdf(files);
    conversions.downloadFile(blob, 'images-to-pdf.pdf');
    await loadStats();
  };

  const handleExcelToCsv = async (files: File[]) => {
    const blob = await conversions.convertExcelToCsv(files[0]);
    conversions.downloadFile(blob, 'converted.csv');
    await loadStats();
  };

  const handleCsvToExcel = async (files: File[]) => {
    const blob = await conversions.convertCsvToExcel(files[0]);
    conversions.downloadFile(blob, 'converted.xlsx');
    await loadStats();
  };

  const handleTextToPdf = async (files: File[]) => {
    const blob = await conversions.convertTextToPdf(files[0]);
    conversions.downloadFile(blob, 'text-to-pdf.pdf');
    await loadStats();
  };

  const handleMergePdfs = async (files: File[]) => {
    const blob = await conversions.mergePdfs(files);
    conversions.downloadFile(blob, 'merged.pdf');
    await loadStats();
  };

  const handleSplitPdf = async (files: File[]) => {
    const blobs = await conversions.splitPdf(files[0]);
    blobs.forEach((blob, index) => {
      conversions.downloadFile(blob, `page-${index + 1}.pdf`);
    });
    await loadStats();
  };

  const handleCompressImage = async (files: File[]) => {
    const blob = await conversions.compressImage(files[0], 0.6);
    conversions.downloadFile(blob, 'compressed.jpg');
    await loadStats();
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.firstName || user?.username}!
            </p>
          </div>
          {!isPremium && (
            <Button className="bg-gradient-primary">
              <ArrowUpCircle className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          )}
        </div>

        {/* Stats Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Usage Stats</CardTitle>
                <CardDescription>Your current plan and usage</CardDescription>
              </div>
              <Badge variant={isPremium ? "default" : "secondary"} className="text-sm">
                {isPremium ? "Premium" : "Free"} Plan
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Conversions Today</span>
                <span className="text-2xl font-bold">
                  {conversionCount} / {limits.daily === Infinity ? '∞' : limits.daily}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Max File Size</span>
                <span className="text-lg font-semibold">
                  {limits.fileSize / (1024 * 1024)} MB
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Options */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Conversion Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ConversionCard
              icon={Image}
              title="Images to PDF"
              description="Combine multiple images into a single PDF"
              acceptedFiles="image/*"
              multipleFiles={true}
              onConvert={handleImagesToPdf}
            />
            
            <ConversionCard
              icon={FileSpreadsheet}
              title="Excel to CSV"
              description="Convert Excel files to CSV format"
              acceptedFiles=".xlsx,.xls"
              onConvert={handleExcelToCsv}
            />
            
            <ConversionCard
              icon={FileSpreadsheet}
              title="CSV to Excel"
              description="Convert CSV files to Excel format"
              acceptedFiles=".csv"
              onConvert={handleCsvToExcel}
            />
            
            <ConversionCard
              icon={FileText}
              title="Text to PDF"
              description="Convert text files to PDF"
              acceptedFiles=".txt"
              onConvert={handleTextToPdf}
            />
            
            <ConversionCard
              icon={Combine}
              title="Merge PDFs"
              description="Combine multiple PDFs into one"
              acceptedFiles=".pdf"
              multipleFiles={true}
              onConvert={handleMergePdfs}
            />
            
            <ConversionCard
              icon={Split}
              title="Split PDF"
              description="Split PDF into individual pages"
              acceptedFiles=".pdf"
              onConvert={handleSplitPdf}
            />
            
            <ConversionCard
              icon={Minimize2}
              title="Compress Image"
              description="Reduce image file size"
              acceptedFiles="image/*"
              onConvert={handleCompressImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
