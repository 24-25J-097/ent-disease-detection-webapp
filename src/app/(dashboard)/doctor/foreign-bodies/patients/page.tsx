"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../identification/firebaseConfig";
import PatientStats from "./components/PatientStats";
import { Report } from "./types/types";

const PatientsPage: NextPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foreign"));
        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Report[];
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Patient Statistics</h1>
      <PatientStats reports={reports} />
    </div>
  );
};

export default PatientsPage;