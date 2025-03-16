"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { ApiUtils } from "@/services/api-service/ApiUtils";
import Image from 'next/image';

const PatientsPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPredictions([]); // Clear bounding boxes
    setIsValidImage(null); // Reset validity check
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Show preview of uploaded image
    }
  };

  const handleCheckImage = async () => {
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(ApiUtils.fastApiUrl + "/api/foreign/run-inference", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data.images[0]?.results[0]?.class === 1;
      setIsValidImage(result);
    } catch (error) {
      console.error("Error checking image validity:", error);
      alert("Failed to validate the image. Please try again.");
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(ApiUtils.fastApiUrl + "/api/foreign/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPredictions(response.data.predictions || []);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to process the image. Please try again.");
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

  const classColors: { [key: string]: string } = {
    C3: "blue",
    C4: "green",
    C5: "yellow",
    C6: "orange",
    C7: "purple",
    B: "red",
    D: "pink",
  };

  const drawBoundingBoxes = () => {
    if (!imageRef.current) return [];

    const imageWidth = imageRef.current.width;
    const imageHeight = imageRef.current.height;

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
            fontSize: "12px",
          }}
        >
          {prediction.class} ({(prediction.confidence * 100).toFixed(2)}%)
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Patients Page</h1>
      <p>Upload an X-ray image to analyze:</p>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
        />
        <button
          onClick={handleCheckImage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Check Validity
        </button>
        {isValidImage === true && (
          <button
            onClick={handleUpload}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Upload and Analyze
          </button>
        )}
      </div>

      {isValidImage === false && <p style={{ color: "red" }}>Please upload a valid image.</p>}

      {imagePreview && (
        <div style={{ position: "relative", display: "inline-block", marginTop: "20px" }}>
          <Image
            ref={imageRef}
            src={imagePreview}
            alt="Uploaded"
            onLoad={handleImageLoad}
            layout="intrinsic"
            width={imageDimensions.width}
            height={imageDimensions.height}
          />
          {drawBoundingBoxes()}
        </div>
      )}
       {/* Confidence rates for classes B and D */}
       {imagePreview && predictions.length > 0 && (
  <div style={{ marginTop: "20px" }}>
    <h3 style={{ fontSize: "18px", color: "#333", textAlign: "center", marginBottom: "10px" }}>
      B - Blockage , D - Object
    </h3>
    <h3 style={{ fontSize: "18px", color: "#333", textAlign: "center", marginBottom: "10px" }}>
      Confidence Rates for Classes B and D
    </h3>
    <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
      {predictions
        .filter((prediction) => prediction.class === "B" || prediction.class === "D")
        .map((prediction, index) => (
          <li
            key={index}
            style={{
              padding: "8px",
              marginBottom: "8px",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#333" }}>Class: {prediction.class}</span>
            <span
              style={{
                color: "black",
                fontSize: "16px", // Increased size
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Confidence: {(prediction.confidence * 100).toFixed(2)}%
            </span>
          </li>
        ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default PatientsPage;