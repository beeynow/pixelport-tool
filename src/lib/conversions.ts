import { PDFDocument } from 'pdf-lib';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const convertPdfToImages = async (file: File): Promise<Blob[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  
  const images: Blob[] = [];
  for (let i = 0; i < pages.length; i++) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;
    
    // This is a simplified version - you'd need pdf.js for full rendering
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    });
    images.push(blob);
  }
  
  return images;
};

export const convertImagesToPdf = async (files: File[]): Promise<Blob> => {
  const pdf = new jsPDF();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dataUrl = await fileToDataUrl(file);
    
    if (i > 0) pdf.addPage();
    
    const img = await loadImage(dataUrl);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
    const width = img.width * ratio;
    const height = img.height * ratio;
    
    pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
  }
  
  return pdf.output('blob');
};

export const convertExcelToCsv = async (file: File): Promise<Blob> => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
  
  return new Blob([csv], { type: 'text/csv' });
};

export const convertCsvToExcel = async (file: File): Promise<Blob> => {
  const text = await file.text();
  const workbook = XLSX.read(text, { type: 'string' });
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};

export const convertTextToPdf = async (file: File): Promise<Blob> => {
  const text = await file.text();
  const pdf = new jsPDF();
  
  const lines = pdf.splitTextToSize(text, 180);
  pdf.text(lines, 15, 15);
  
  return pdf.output('blob');
};

export const mergePdfs = async (files: File[]): Promise<Blob> => {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  const pdfBytes = await mergedPdf.save();
  return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
};

export const splitPdf = async (file: File): Promise<Blob[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  
  const pdfs: Blob[] = [];
  for (let i = 0; i < pages.length; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    
    const pdfBytes = await newPdf.save();
    pdfs.push(new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' }));
  }
  
  return pdfs;
};

export const compressImage = async (file: File, quality: number = 0.8): Promise<Blob> => {
  const dataUrl = await fileToDataUrl(file);
  const img = await loadImage(dataUrl);
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  ctx.drawImage(img, 0, 0);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', quality);
  });
};

// Helper functions
const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};

export const downloadFile = (blob: Blob, filename: string) => {
  saveAs(blob, filename);
};
