'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { validateAndProcessImage } from '../utils/imageUtils';

interface ImageUploaderProps {
  currentImageUrl: string;
  onImageProcessed: (imageUrl: string, predictions: any[]) => void;
  onProcessingStatusChange: (isProcessing: boolean) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  currentImageUrl, 
  onImageProcessed,
  onProcessingStatusChange
}) => {
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!newImageFile) return;
    
    setIsProcessing(true);
    setIsValidImage(null);
    onProcessingStatusChange(true);
    
    try {
      const result = await validateAndProcessImage(newImageFile);
      
      setIsValidImage(result.isValid);
      
      if (result.isValid && result.imageUrl && result.predictions) {
        onImageProcessed(result.imageUrl, result.predictions);
      }
      
      return result.isValid;
    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    } finally {
      setIsProcessing(false);
      onProcessingStatusChange(false);
    }
  };

  return (
    
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">
        Update X-Ray Image (Optional)
      </label>
      <div className="space-y-4">
       {/* Current image preview */}
       <div className="relative w-full h-48">
       <Image
           src={newImagePreview || currentImageUrl}
           alt="X-Ray Preview"
           fill
           className="object-contain rounded-lg"
       />
   </div>
   
   {/* Image upload input */}
   <input
       type="file"
       accept="image/*"
       onChange={handleImageChange}
       className="block w-full text-sm text-gray-500
           file:mr-4 file:py-2 file:px-4
           file:rounded-full file:border-0
           file:text-sm file:font-semibold
           file:bg-blue-50 file:text-blue-700
           hover:file:bg-blue-100"
   />
   
   {/* Validation feedback */}
   {isValidImage === false && (
       <p className="text-red-500 text-sm">
           Please upload a valid X-ray image
       </p>
   )}
   {isValidImage === true && (
       <p className="text-green-500 text-sm">
           Valid X-ray image
       </p>
   )}
   
   {newImageFile && (
       <button
           onClick={handleImageUpload}
           disabled={isProcessing}
           className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md disabled:opacity-50">
           {isProcessing ? 'Processing...' : 'Upload & Process Image'}
       </button>
   )}
 </div>
</div>

);
};

export default ImageUploader;