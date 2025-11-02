import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const Conversions = lazy(() => import("./pages/Conversions"));
const Features = lazy(() => import("./pages/Features"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Conversion pages
const PdfToWord = lazy(() => import("./pages/conversions/PdfToWord"));
const PdfToExcel = lazy(() => import("./pages/conversions/PdfToExcel"));
const PdfToImage = lazy(() => import("./pages/conversions/PdfToImage"));
const PdfToPowerpoint = lazy(() => import("./pages/conversions/PdfToPowerpoint"));
const WordToPdf = lazy(() => import("./pages/conversions/WordToPdf"));
const ExcelToPdf = lazy(() => import("./pages/conversions/ExcelToPdf"));
const PowerpointToPdf = lazy(() => import("./pages/conversions/PowerpointToPdf"));
const CompressPdf = lazy(() => import("./pages/conversions/CompressPdf"));
const MergePdf = lazy(() => import("./pages/conversions/MergePdf"));
const SplitPdf = lazy(() => import("./pages/conversions/SplitPdf"));
const JpgToPng = lazy(() => import("./pages/conversions/JpgToPng"));
const PngToJpg = lazy(() => import("./pages/conversions/PngToJpg"));
const JpgToPdf = lazy(() => import("./pages/conversions/JpgToPdf"));
const PngToPdf = lazy(() => import("./pages/conversions/PngToPdf"));
const JpgToWebp = lazy(() => import("./pages/conversions/JpgToWebp"));
const PngToWebp = lazy(() => import("./pages/conversions/PngToWebp"));
const WebpToJpg = lazy(() => import("./pages/conversions/WebpToJpg"));
const WebpToPng = lazy(() => import("./pages/conversions/WebpToPng"));
const HeicToJpg = lazy(() => import("./pages/conversions/HeicToJpg"));
const BmpToJpg = lazy(() => import("./pages/conversions/BmpToJpg"));
const BmpToPng = lazy(() => import("./pages/conversions/BmpToPng"));
const TiffToJpg = lazy(() => import("./pages/conversions/TiffToJpg"));
const TiffToPng = lazy(() => import("./pages/conversions/TiffToPng"));
const SvgToPng = lazy(() => import("./pages/conversions/SvgToPng"));
const SvgToJpg = lazy(() => import("./pages/conversions/SvgToJpg"));
const ImageToSvg = lazy(() => import("./pages/conversions/ImageToSvg"));
const IcoConverter = lazy(() => import("./pages/conversions/IcoConverter"));
const PngToIco = lazy(() => import("./pages/conversions/PngToIco"));
const JpgToIco = lazy(() => import("./pages/conversions/JpgToIco"));
const CompressImage = lazy(() => import("./pages/conversions/CompressImage"));
const ResizeImage = lazy(() => import("./pages/conversions/ResizeImage"));
const CropImage = lazy(() => import("./pages/conversions/CropImage"));
const RotateImage = lazy(() => import("./pages/conversions/RotateImage"));
const FlipImage = lazy(() => import("./pages/conversions/FlipImage"));
const ExcelToCsv = lazy(() => import("./pages/conversions/ExcelToCsv"));
const CsvToExcel = lazy(() => import("./pages/conversions/CsvToExcel"));
const CsvToJson = lazy(() => import("./pages/conversions/CsvToJson"));
const JsonToCsv = lazy(() => import("./pages/conversions/JsonToCsv"));
const JsonToExcel = lazy(() => import("./pages/conversions/JsonToExcel"));
const ExcelToJson = lazy(() => import("./pages/conversions/ExcelToJson"));
const XmlToJson = lazy(() => import("./pages/conversions/XmlToJson"));
const JsonToXml = lazy(() => import("./pages/conversions/JsonToXml"));
const YamlToJson = lazy(() => import("./pages/conversions/YamlToJson"));
const JsonToYaml = lazy(() => import("./pages/conversions/JsonToYaml"));
const TextToPdf = lazy(() => import("./pages/conversions/TextToPdf"));
const TextToQr = lazy(() => import("./pages/conversions/TextToQr"));
const HtmlToPdf = lazy(() => import("./pages/conversions/HtmlToPdf"));
const MarkdownToHtml = lazy(() => import("./pages/conversions/MarkdownToHtml"));
const EpubToPdf = lazy(() => import("./pages/conversions/EpubToPdf"));
const MobiToPdf = lazy(() => import("./pages/conversions/MobiToPdf"));
const OdtToPdf = lazy(() => import("./pages/conversions/OdtToPdf"));
const RtfToPdf = lazy(() => import("./pages/conversions/RtfToPdf"));
const Mp4ToMp3 = lazy(() => import("./pages/conversions/Mp4ToMp3"));
const Mp3ToWav = lazy(() => import("./pages/conversions/Mp3ToWav"));
const WavToMp3 = lazy(() => import("./pages/conversions/WavToMp3"));
const AudioToText = lazy(() => import("./pages/conversions/AudioToText"));
const CompressAudio = lazy(() => import("./pages/conversions/CompressAudio"));
const CompressVideo = lazy(() => import("./pages/conversions/CompressVideo"));
const VideoToGif = lazy(() => import("./pages/conversions/VideoToGif"));
const GifToVideo = lazy(() => import("./pages/conversions/GifToVideo"));
const TrimVideo = lazy(() => import("./pages/conversions/TrimVideo"));
const MergeVideo = lazy(() => import("./pages/conversions/MergeVideo"));
const Base64Encode = lazy(() => import("./pages/conversions/Base64Encode"));
const Base64Decode = lazy(() => import("./pages/conversions/Base64Decode"));
const UrlEncode = lazy(() => import("./pages/conversions/UrlEncode"));
const UrlDecode = lazy(() => import("./pages/conversions/UrlDecode"));
const HashGenerator = lazy(() => import("./pages/conversions/HashGenerator"));
const PasswordGenerator = lazy(() => import("./pages/conversions/PasswordGenerator"));
const TextConverter = lazy(() => import("./pages/conversions/TextConverter"));
const WordCounter = lazy(() => import("./pages/conversions/WordCounter"));

// Optimized loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/conversions" element={<Conversions />} />
            <Route path="/features" element={<Features />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* PDF Conversions */}
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/pdf-to-excel" element={<PdfToExcel />} />
            <Route path="/pdf-to-image" element={<PdfToImage />} />
            <Route path="/pdf-to-powerpoint" element={<PdfToPowerpoint />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
            <Route path="/powerpoint-to-pdf" element={<PowerpointToPdf />} />
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            
            {/* Image Conversions */}
            <Route path="/jpg-to-png" element={<JpgToPng />} />
            <Route path="/png-to-jpg" element={<PngToJpg />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/png-to-pdf" element={<PngToPdf />} />
            <Route path="/jpg-to-webp" element={<JpgToWebp />} />
            <Route path="/png-to-webp" element={<PngToWebp />} />
            <Route path="/webp-to-jpg" element={<WebpToJpg />} />
            <Route path="/webp-to-png" element={<WebpToPng />} />
            <Route path="/heic-to-jpg" element={<HeicToJpg />} />
            <Route path="/bmp-to-jpg" element={<BmpToJpg />} />
            <Route path="/bmp-to-png" element={<BmpToPng />} />
            <Route path="/tiff-to-jpg" element={<TiffToJpg />} />
            <Route path="/tiff-to-png" element={<TiffToPng />} />
            <Route path="/svg-to-png" element={<SvgToPng />} />
            <Route path="/svg-to-jpg" element={<SvgToJpg />} />
            <Route path="/image-to-svg" element={<ImageToSvg />} />
            <Route path="/ico-converter" element={<IcoConverter />} />
            <Route path="/png-to-ico" element={<PngToIco />} />
            <Route path="/jpg-to-ico" element={<JpgToIco />} />
            <Route path="/compress-image" element={<CompressImage />} />
            <Route path="/resize-image" element={<ResizeImage />} />
            <Route path="/crop-image" element={<CropImage />} />
            <Route path="/rotate-image" element={<RotateImage />} />
            <Route path="/flip-image" element={<FlipImage />} />
            
            {/* Data Conversions */}
            <Route path="/excel-to-csv" element={<ExcelToCsv />} />
            <Route path="/csv-to-excel" element={<CsvToExcel />} />
            <Route path="/csv-to-json" element={<CsvToJson />} />
            <Route path="/json-to-csv" element={<JsonToCsv />} />
            <Route path="/json-to-excel" element={<JsonToExcel />} />
            <Route path="/excel-to-json" element={<ExcelToJson />} />
            <Route path="/xml-to-json" element={<XmlToJson />} />
            <Route path="/json-to-xml" element={<JsonToXml />} />
            <Route path="/yaml-to-json" element={<YamlToJson />} />
            <Route path="/json-to-yaml" element={<JsonToYaml />} />
            
            {/* Text & Document Conversions */}
            <Route path="/text-to-pdf" element={<TextToPdf />} />
            <Route path="/text-to-qr" element={<TextToQr />} />
            <Route path="/html-to-pdf" element={<HtmlToPdf />} />
            <Route path="/markdown-to-html" element={<MarkdownToHtml />} />
            <Route path="/epub-to-pdf" element={<EpubToPdf />} />
            <Route path="/mobi-to-pdf" element={<MobiToPdf />} />
            <Route path="/odt-to-pdf" element={<OdtToPdf />} />
            <Route path="/rtf-to-pdf" element={<RtfToPdf />} />
            
            {/* Audio & Video Conversions */}
            <Route path="/mp4-to-mp3" element={<Mp4ToMp3 />} />
            <Route path="/mp3-to-wav" element={<Mp3ToWav />} />
            <Route path="/wav-to-mp3" element={<WavToMp3 />} />
            <Route path="/audio-to-text" element={<AudioToText />} />
            <Route path="/compress-audio" element={<CompressAudio />} />
            <Route path="/compress-video" element={<CompressVideo />} />
            <Route path="/video-to-gif" element={<VideoToGif />} />
            <Route path="/gif-to-video" element={<GifToVideo />} />
            <Route path="/trim-video" element={<TrimVideo />} />
            <Route path="/merge-video" element={<MergeVideo />} />
            
            {/* Utilities */}
            <Route path="/base64-encode" element={<Base64Encode />} />
            <Route path="/base64-decode" element={<Base64Decode />} />
            <Route path="/url-encode" element={<UrlEncode />} />
            <Route path="/url-decode" element={<UrlDecode />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/text-converter" element={<TextConverter />} />
            <Route path="/word-counter" element={<WordCounter />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
