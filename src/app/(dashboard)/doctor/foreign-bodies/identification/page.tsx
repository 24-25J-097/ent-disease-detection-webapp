"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { ApiUtils } from "@/services/api-service/ApiUtils";
import Image from 'next/image';
import LoadingModal from "@/components/loaders/LoadingModal";
import { motion } from "framer-motion";
import { If } from "@/components/utils/If";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import UniquePatientIdInput from "./uniqueIdInput";

const PatientsPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showFullSizeModal, setShowFullSizeModal] = useState<boolean>(false);
  const [resizedDimensions, setResizedDimensions] = useState<{ width: number; height: number }>({ width: 800, height: 600 });
  const [patientId, setPatientId] = useState<string>("");
const [note, setNote] = useState<string>("");
const [isPatientIdValid, setIsPatientIdValid] = useState(false);


  const imageRef = useRef<HTMLImageElement | null>(null);
  const fullSizeImageRef = useRef<HTMLImageElement | null>(null);

  const uploadImageToFirebase = async (file: File) => {
    const storageRef = ref(storage, `lateral/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const saveMetadataToFirestore = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "foreign"), data);
      return docRef.id;
    } catch (error) {
      console.error("Error saving metadata to Firestore:", error);
      throw error;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPredictions([]); // Clear bounding boxes
    setIsValidImage(null); // Reset validity check
    setErrors(null); // Clear any previous errors
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Show preview of uploaded image
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      setErrors("Please upload an image.");
      return;
    }

    if (!patientId.trim() || !isPatientIdValid) {
      setErrors("Please enter a valid Patient ID.");
      return;
    }
  
    setIsLoading(true);
    setIsDisabled(true);
    setErrors(null);
  
    try {
      // First check if the image is valid
      const validityFormData = new FormData();
      validityFormData.append("file", imageFile);
  
      const validityResponse = await axios.post(
        ApiUtils.fastApiUrl2 + "/api/foreign/run-inference", 
        validityFormData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      const isValid = validityResponse.data.images[0]?.results[0]?.class === 1;
      setIsValidImage(isValid);
  
      // If valid, proceed with detection
      if (isValid) {
        const detectionFormData = new FormData();
        detectionFormData.append("image", imageFile);
  
        const detectResponse = await axios.post(
          ApiUtils.fastApiUrl2 + "/api/foreign/detect", 
          detectionFormData, 
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        const predictions = detectResponse.data.predictions || [];
        setPredictions(predictions);
  
        // Upload image to Firebase Storage
        const imageUrl = await uploadImageToFirebase(imageFile);
  
        // Save metadata to Firestore
        const metadata = {
          patientId,
          note,
          imageUrl,
          predictions,
          timestamp: new Date(),
        };
        await saveMetadataToFirestore(metadata);
      } else {
        setErrors("Please upload a valid X-ray image.");
      }
    } catch (error: any) {
      console.error("Error processing image:", error);
      if (error.response?.status && error.response.status >= 500) {
        setErrors("An unexpected error occurred. Please try again.");
      } else {
        setErrors(error.response?.data?.message || "Failed to process the image. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  const handleResize = (event: any, { size }: any) => {
    setResizedDimensions(size);
  };

  const classColors: { [key: string]: string } = {
    C3: "blue",
    C4: "green",
    C5: "yellow",
    C6: "orange",
    C7: "purple",
    B: "red",
    D: "pink",
  };

  const drawBoundingBoxes = (containerRef: React.RefObject<HTMLImageElement>) => {
    if (!containerRef.current) return [];

    const imageWidth = containerRef.current.width;
    const imageHeight = containerRef.current.height;

    return predictions.map((prediction, index) => {
      const x1 = prediction.x - prediction.width / 2;
      const y1 = prediction.y - prediction.height / 2;
      const x2 = prediction.x + prediction.width / 2;
      const y2 = prediction.y + prediction.height / 2;

      const scaledX1 = (x1 / imageDimensions.width) * imageWidth;
      const scaledY1 = (y1 / imageDimensions.height) * imageHeight;
      const scaledX2 = (x2 / imageDimensions.width) * imageWidth;
      const scaledY2 = (y2 / imageDimensions.height) * imageHeight;

      const boxColor = classColors[prediction.class] || "black";

      return (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${scaledX1}px`,
            top: `${scaledY1}px`,
            width: `${scaledX2 - scaledX1}px`,
            height: `${scaledY2 - scaledY1}px`,
            border: `2px solid ${boxColor}`,
            color: boxColor,
            fontSize: containerRef === fullSizeImageRef ? "16px" : "12px",
            fontWeight: "bold",
            textShadow: "1px 1px 1px rgba(255,255,255,0.7)",
          }}
        >
          {prediction.class} ({(prediction.confidence * 100).toFixed(2)}%)
        </div>
      );
    });
  };

  // Handle clicking outside the modal to close it
  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowFullSizeModal(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen px-4">
      <div className="flex py-8 justify-between">
        <h1 className="text-slate-600 text-3xl font-bold mb-6">Patients Page</h1>
      </div>

      <div className="flex flex-wrap gap-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg mb-6">
  <h3 className="text-blue-500 text-2xl font-bold mb-8 text-start">
    Upload an X-ray image to analyze
  </h3>

  <If condition={!!errors}>
    <motion.div
      className="bg-red-100 text-red-700 p-4 rounded-2xl border-l-8 border-r-8 border-x-red-200 mb-6"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
    >
      {errors}
    </motion.div>
  </If>

  <div className="mb-6">
  <label className="block text-gray-700 font-semibold mb-2">
    Patient ID
  </label>
  <UniquePatientIdInput
    value={patientId}
    onChange={(value, isValid) => {
      setPatientId(value);
      setIsPatientIdValid(isValid);
    }}
  />
</div>

  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">
      Note
    </label>
    <textarea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      className="w-full text-gray-600 p-2 rounded-md border border-gray-300"
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">
      Upload Image
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="w-full text-gray-600 p-2 rounded-md file:mr-4 
        file:py-2 file:px-4 file:border-0 file:rounded-md file:text-white file:bg-blue-900
        file:cursor-pointer hover:file:bg-blue-700 border border-gray-300"
    />
  </div>

  <div className="flex justify-end">
    <button
      onClick={handleUpload}
      disabled={isLoading || !imageFile || isDisabled}
      className={`bg-blue-600 text-white py-2 px-6 rounded-md focus:outline-none ${
        !imageFile || isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
    >
      {isDisabled ? "Processing..." : "Upload"}
    </button>
  </div>

  {/* Confidence rates for classes B and D */}
  {imagePreview && predictions.length > 0 && (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full mt-6">
      <h3 className="text-blue-500 text-xl font-bold mb-4">
        Analysis Results
      </h3>
      <div className="mb-4">
        <p className="text-gray-600 font-semibold mb-2">B - Blockage , D - Object</p>
      </div>
      <h4 className="text-gray-700 font-semibold mb-4">
        Confidence Rates for Classes B and D
      </h4>
      <ul className="space-y-2">
        {predictions
          .filter((prediction) => prediction.class === "B" || prediction.class === "D")
          .map((prediction, index) => (
            <li
              key={index}
              className="p-4 border border-gray-200 rounded-md"
            >
              <span className="font-bold text-gray-700">Class: {prediction.class}</span>
              <span className="ml-4 text-lg font-bold">
                Confidence: {(prediction.confidence * 100).toFixed(2)}%
              </span>
            </li>
          ))}
      </ul>
    </div>
  )}
</div>

        {imagePreview && (
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-blue-500 text-xl font-bold">X-Ray Preview</h4>
              <button
                onClick={() => setShowFullSizeModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
                disabled={!predictions.length}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                </svg>
                View Full Size
              </button>
            </div>
            <div className="relative inline-block">
              <Image
                ref={imageRef}
                src={imagePreview}
                alt="Uploaded X-Ray"
                onLoad={handleImageLoad}
                width={400}
                height={400}
                className="rounded-md"
              />
              {predictions.length > 0 && drawBoundingBoxes(imageRef)}
            </div>
          </div>
        )}
      </div>

      {/* Full Size Modal */}
      {showFullSizeModal && imagePreview && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-auto"
          onClick={handleModalBackdropClick}
        >
          <ResizableBox
            width={resizedDimensions.width}
            height={resizedDimensions.height}
            minConstraints={[300, 300]}
            maxConstraints={[1200, 800]}
            onResize={handleResize}
            className="bg-white rounded-lg p-4 overflow-auto"
          >
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white bg-opacity-0 p-2 z-10">
              <button 
                onClick={() => setShowFullSizeModal(false)}
                className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-gray-700 focus:outline-none ml-auto"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="relative inline-block">
              <img
                ref={fullSizeImageRef}
                src={imagePreview}
                alt="Full Size X-Ray"
                className="max-w-full"
                onLoad={() => {
                  // Force a re-render to ensure bounding boxes are positioned correctly
                  if (fullSizeImageRef.current) {
                    setImageDimensions({
                      width: fullSizeImageRef.current.naturalWidth,
                      height: fullSizeImageRef.current.naturalHeight,
                    });
                  }
                }}
              />
              {predictions.length > 0 && drawBoundingBoxes(fullSizeImageRef)}
            </div>
          </ResizableBox>
        </div>
      )}

      {/* Loading Modal */}
      <LoadingModal isOpen={isLoading} text="Analyzing" imagePath="/images/medical-analyzing.gif" />
    </div>
  );
};

export default PatientsPage;