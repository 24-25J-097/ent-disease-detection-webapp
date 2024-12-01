"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

const PatientsPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    // Clear bounding boxes
setPredictions([]);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Show preview of uploaded image
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
      const response = await axios.post("http://localhost:8000/detect", formData, {
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

      // Get the color for the class, defaulting to black if not found
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
            border: `2px solid ${boxColor}`, // Apply class-specific color
            color: boxColor, // Use the same color for the text
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
      
      {/* File Picker and Upload Button */}
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
</div>
      {imagePreview && (
        <div style={{ position: "relative", display: "inline-block", marginTop: "20px" }}>
          <img
            ref={imageRef}
            src={imagePreview}
            alt="Uploaded"
            onLoad={handleImageLoad}
            style={{ maxWidth: "100%" }}
          />
         
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div style={{ position: "relative", display: "inline-block", marginTop: "20px" }}>
          <img
            ref={imageRef}
            src={imagePreview}
            alt="Uploaded"
            onLoad={handleImageLoad}
            style={{ maxWidth: "100%" }}
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
