import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Report } from '../types';

export const generatePDF = async (selectedReport: Report, elementId: string): Promise<void> => {
    try {
        // First, we need to capture the image with bounding boxes
        const imageContainer = document.getElementById(elementId);
        if (!imageContainer) {
            console.error('Image container not found');
            throw new Error('Image container not found');
        }

        // Capture the image with bounding boxes as canvas
        const canvas = await html2canvas(imageContainer, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // To handle cross-origin images
            allowTaint: true,
        });

        // Create new PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // A4 size: 210 x 297 mm
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Add title
        pdf.setFontSize(16);
        pdf.text(
            `X-Ray Report: Patient ${selectedReport.patientId}`,
            pageWidth / 2,
            15,
            { align: 'center' },
        );

        // Set up image dimensions (keep aspect ratio)
        const imgWidth = pageWidth - 40; // 20mm margin on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add the image with bounding boxes
        const imgData = canvas.toDataURL('image/jpeg');
        pdf.addImage(imgData, 'PNG', 20, 25, imgWidth, imgHeight);

        // Add detection results
        let yPos = 25 + imgHeight + 10;

        // Add detection results title
        pdf.setFontSize(14);
        pdf.text('Detection Results', 20, yPos);
        yPos += 10;

        // Add detection details
        pdf.setFontSize(12);
        selectedReport.predictions
            .filter(
                prediction =>
                    prediction.class === 'B' || prediction.class === 'D',
            )
            .forEach((prediction, index) => {
                const text = `${prediction.class === 'B' ? 'Blockage' : 'Object'}: Confidence ${(prediction.confidence * 100).toFixed(2)}%`;
                pdf.text(text, 25, yPos);
                yPos += 8;

                // Add a new page if needed
                if (yPos > pageHeight - 20) {
                    pdf.addPage();
                    yPos = 20;
                }
            });

        // Add notes section
        pdf.setFontSize(14);
        pdf.text('Analysis Notes', 20, yPos);
        yPos += 10;

        // Add notes content (with word wrapping)
        pdf.setFontSize(12);
        const splitText = pdf.splitTextToSize(
            selectedReport.note,
            pageWidth - 40,
        );
        pdf.text(splitText, 20, yPos);

        // Save the PDF
        pdf.save(`patient-${selectedReport.patientId}-report.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};
