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
  const [name, setName] = useState(report.name || '');
  const [email, setEmail] = useState(report.email || '');
  const [phone, setPhone] = useState(report.phone || '');
  const [age, setAge] = useState(report.age || '');
  const [address, setAddress] = useState(report.address || '');
  const [gender, setGender] = useState(report.gender || 'male');
  const [note, setNote] = useState(report.note);
  const [imageUrl, setImageUrl] = useState(report.imageUrl);
  const [predictions, setPredictions] = useState(report.predictions);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter patient name';
    }
    if (!age) {
      newErrors.age = 'Please enter patient age';
    }
    if (!gender) {
      newErrors.gender = 'Please select gender';
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    const success = await onUpdate(report.id, {
      patientId,
      name: name.trim(),
      email: email.trim() || null,
      phone: phone.trim() || null,
      age: age ? parseInt(age) : null,
      address: address.trim() || null,
      gender,
      note: note.trim(),
      imageUrl,
      predictions
    });
    
    if (success) {
      onClose();
    }
  };

  const handleImageProcessed = (newImageUrl: string, newPredictions: any[]) => {
    setImageUrl(newImageUrl);
    setPredictions(newPredictions);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Update Report
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Patient ID - Read Only */}
          <div className="col-span-2">
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

          {/* Name */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full text-gray-600 p-2 rounded-md border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter patient name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Age */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="150"
              value={age}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 150)) {
                  setAge(value);
                  if (errors.age) setErrors({ ...errors, age: '' });
                }
              }}
              className={`w-full text-gray-600 p-2 rounded-md border ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Gender */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                if (errors.gender) setErrors({ ...errors, gender: '' });
              }}
              className={`w-full text-gray-600 p-2 rounded-md border ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Email */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full text-gray-600 p-2 rounded-md border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              className={`w-full text-gray-600 p-2 rounded-md border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-gray-600 p-2 rounded-md border border-gray-300 h-20"
              placeholder="Enter address"
            />
          </div>

          {/* Note */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-gray-600 p-2 rounded-md border border-gray-300 h-32"
              placeholder="Enter medical notes"
            />
          </div>
        </div>

        <div className="mt-6">
          <ImageUploader 
            currentImageUrl={imageUrl}
            onImageProcessed={handleImageProcessed}
            onProcessingStatusChange={setIsImageProcessing}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
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