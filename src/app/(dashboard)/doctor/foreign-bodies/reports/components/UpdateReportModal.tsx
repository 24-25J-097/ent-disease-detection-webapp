
'use client';
import React, { useState } from 'react';
import { Report } from '../types/types';
import ImageUploader from './ImageUploader';

interface UpdateReportModalProps {
  report: Report;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onUpdate: (reportId: string, data: Partial<Report>) => Promise<boolean>;
}

const UpdateReportModal: React.FC<UpdateReportModalProps> = ({
  report,
  isOpen,
  isLoading,
  onClose,
  onUpdate,
}) => {
  const [patientId, setPatientId] = useState(report.patientId);
  const [note, setNote] = useState(report.note);
  const [imageUrl, setImageUrl] = useState(report.imageUrl);
  const [predictions, setPredictions] = useState(report.predictions);
  const [isImageProcessing, setIsImageProcessing] = useState(false);

  if (!isOpen) return null;

  const handleUpdateSubmit = async () => {
    const success = await onUpdate(report.id, {
      patientId,
      note
    });
    
    if (success) {
      onClose();
    }
  };

  const handleImageProcessed = (newImageUrl: string, newPredictions: any[]) => {
    setImageUrl(newImageUrl);
    setPredictions(newPredictions);
    onUpdate(report.id, {
      imageUrl: newImageUrl,
      predictions: newPredictions
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Update Report
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Patient ID
          </label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full text-gray-600 p-2 rounded-md border border-gray-300"
          />
        </div> */}
        <div className="mb-6">
  <label className="block text-gray-700 font-semibold mb-2">
    Patient ID
  </label>
  <input
    type="text"
    value={patientId}
    readOnly
    className="w-full text-gray-600 p-2 rounded-md border border-gray-300 bg-gray-50 cursor-not-allowed"
  />
</div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full text-gray-600 p-2 rounded-md border border-gray-300 h-32"
          />
        </div>

        <ImageUploader 
          currentImageUrl={imageUrl}
          onImageProcessed={handleImageProcessed}
          onProcessingStatusChange={setIsImageProcessing}
        />

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-md">
            Cancel
          </button>
          <button
            onClick={handleUpdateSubmit}
            disabled={isLoading || isImageProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md disabled:opacity-50">
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateReportModal;
