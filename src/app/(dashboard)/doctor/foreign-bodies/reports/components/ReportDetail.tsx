'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Report, ImageDimensions, CLASS_COLORS } from '../types/types';
import { drawBoundingBoxes } from '../utils/imageUtils';
import { generatePDF } from '../utils/pdf';
import { useToast } from '@/providers/ToastProvider';

interface ReportDetailProps {
  report: Report;
  onBack: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, onBack }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { notifyError } = useToast();

const handleGeneratePDF = async () => {
    setIsLoading(true);
    try {
      await generatePDF(report, 'report-image-container');
    } catch (error) {
      console.error('Error generating PDF:', error);
      notifyError('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderBoundingBoxes = () => {
    if (!imageRef.current) return null;

    const boxes = drawBoundingBoxes(
      report.predictions,
      imageRef.current.width,
      imageRef.current.height,
      imageDimensions,
      CLASS_COLORS
    );

    return boxes.map(box => (
      <div
        key={box.key}
        style={box.style}>
        {box.label}
      </div>
    ));
  };

  return (
    <div className="bg-blue-50 min-h-screen px-4 py-8">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to List
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Patient Details
            </h2>
            <div className="space-x-2">
              <button
                onClick={handleGeneratePDF}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate PDF'}
              </button>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Patient ID:</span>{' '}
                  {report.patientId}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Name:</span>{' '}
                  {report.name || 'Not provided'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Age:</span>{' '}
                  {report.age || 'Not provided'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Gender:</span>{' '}
                  {report.gender ? report.gender.charAt(0).toUpperCase() + report.gender.slice(1) : 'Not provided'}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span>{' '}
                  {report.email || 'Not provided'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Phone:</span>{' '}
                  {report.phone || 'Not provided'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Address:</span>{' '}
                  {report.address || 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Detection Results Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Detection Results
            </h3>
            <div className="space-y-2">
              {report.predictions
                .filter(prediction => prediction.class === 'B' || prediction.class === 'D')
                .map((prediction, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">
                      {prediction.class === 'B' ? 'Blockage' : 'Device'}:
                      <span className="ml-4 text-blue-600">
                        Confidence: {(prediction.confidence * 100).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Analysis Note Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Analysis Note:
            </h3>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <p className="text-gray-600">
                {report.note || 'No notes provided'}
              </p>
            </div>
          </div>

          {/* X-Ray Image Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              X-Ray Image
            </h3>
            <div className="relative" id="report-image-container">
              <Image
                ref={imageRef}
                src={report.imageUrl}
                alt={`X-Ray for patient ${report.patientId}`}
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg w-auto h-auto"
                style={{ maxWidth: '100%' }}
                priority
                unoptimized
                onLoad={(e) => {
                  if (imageRef.current) {
                    const { naturalWidth, naturalHeight } = imageRef.current;
                    setImageDimensions({
                      width: naturalWidth,
                      height: naturalHeight,
                    });
                  }
                }}
              />
              <div className="absolute inset-0">
                {renderBoundingBoxes()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;