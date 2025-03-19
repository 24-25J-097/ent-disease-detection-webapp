import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Report } from '../types/types';

export const generatePDF = async (selectedReport: Report, elementId: string): Promise<void> => {
    try {
        // Create PDF with custom font
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Get page dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Add hospital header (optional)
        pdf.setFillColor(41, 82, 156); // Blue header
        pdf.rect(0, 0, pageWidth, 25, 'F');
        pdf.setTextColor(255, 255, 255); // White text
        pdf.setFontSize(20);
        pdf.text('X-Ray Analysis Report', pageWidth / 2, 15, { align: 'center' });

        // Reset text color for rest of document
        pdf.setTextColor(33, 33, 33);

        // Add patient information section
        pdf.setFontSize(12);
        pdf.text(`Patient ID: ${selectedReport.patientId}`, 20, 35);
        pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 35);

        // Capture and add image
        const imageContainer = document.getElementById(elementId);
        if (!imageContainer) throw new Error('Image container not found');

        const canvas = await html2canvas(imageContainer, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
        });

        // Calculate image dimensions
        const imgWidth = pageWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/jpeg');

        // Add image with frame
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.rect(19, 44, imgWidth + 2, imgHeight + 2);
        pdf.addImage(imgData, 'PNG', 20, 45, imgWidth, imgHeight);

        // Detection Results Section
        let yPos = 45 + imgHeight + 15;

        // Add section title with background
        pdf.setFillColor(241, 245, 249); // Light blue background
        pdf.rect(15, yPos - 7, pageWidth - 30, 10, 'F');
        pdf.setFontSize(14);
        pdf.setTextColor(41, 82, 156);
        pdf.text('Detection Results', 20, yPos);
        
        yPos += 10;
        pdf.setTextColor(33, 33, 33);
        pdf.setFontSize(12);

        // Add detection details with icons and better formatting
        selectedReport.predictions
            .filter(prediction => prediction.class === 'B' || prediction.class === 'D')
            .forEach((prediction) => {
                const confidenceLevel = (prediction.confidence * 100).toFixed(1);
                const objectType = prediction.class === 'B' ? ' Blockage' : ' Device';
                
                pdf.setFontSize(11);
                const text = `${objectType} detected (Confidence: ${confidenceLevel}%)`;
                pdf.text('•', 25, yPos);
                pdf.text(text, 30, yPos);
                yPos += 8;

                if (yPos > pageHeight - 30) {
                    pdf.addPage();
                    yPos = 20;
                }
            });

        // Analysis Notes Section
        yPos += 5;
        pdf.setFillColor(241, 245, 249);
        pdf.rect(15, yPos - 7, pageWidth - 30, 10, 'F');
        pdf.setFontSize(14);
        pdf.setTextColor(41, 82, 156);
        pdf.text('Analysis Notes', 20, yPos);
        yPos += 10;

        // Add notes with better formatting
        pdf.setTextColor(33, 33, 33);
        pdf.setFontSize(11);
        const splitText = pdf.splitTextToSize(selectedReport.note, pageWidth - 45);
        pdf.text(splitText, 20, yPos);

        // Add footer
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(
            `Generated on ${new Date().toLocaleString()}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
        );

        // Save PDF
        pdf.save(`patient-${selectedReport.patientId}-report.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};