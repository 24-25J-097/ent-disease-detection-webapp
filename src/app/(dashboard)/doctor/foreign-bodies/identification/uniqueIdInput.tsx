import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface UniquePatientIdInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  className?: string;
}

const UniquePatientIdInput: React.FC<UniquePatientIdInputProps> = ({
  value,
  onChange,
  className = ""
}) => {
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isIdUnique, setIsIdUnique] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPatientIdUniqueness = async () => {
      if (!value.trim()) {
        setIsIdUnique(null);
        onChange(value, false);
        return;
      }

      setIsCheckingId(true);
      try {
        const q = query(
          collection(db, "foreign"),
          where("patientId", "==", value.trim())
        );
        const querySnapshot = await getDocs(q);
        const unique = querySnapshot.empty;
        setIsIdUnique(unique);
        onChange(value, unique);
      } catch (error) {
        console.error("Error checking ID uniqueness:", error);
        setIsIdUnique(null);
        onChange(value, false);
      } finally {
        setIsCheckingId(false);
      }
    };

    const timeoutId = setTimeout(checkPatientIdUniqueness, 500);
    return () => clearTimeout(timeoutId);
  }, [value, onChange]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value, isIdUnique || false)}
        className={`w-full text-gray-600 p-2 rounded-md border ${
          isIdUnique === false 
            ? 'border-red-500' 
            : isIdUnique === true 
              ? 'border-green-500' 
              : 'border-gray-300'
        } ${className}`}
        placeholder="Enter Patient ID"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {isCheckingId && (
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        )}
      </div>
      {!isCheckingId && (
        <div className="mt-1 text-sm">
          {isIdUnique === false && (
            <p className="text-red-500">This Patient ID already exists</p>
          )}
          {isIdUnique === true && (
            <p className="text-green-500">Patient ID is available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UniquePatientIdInput;