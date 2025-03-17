'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Report } from '../types/types';
import { fetchAllReports, deleteReport, updateReport } from '@/app/(dashboard)/doctor/foreign-bodies/firebase/reports';
import { useToast } from '@/providers/ToastProvider';

interface ReportsContextType {
  reports: Report[];
  isLoading: boolean;
  selectedReport: Report | null;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (id: string, data: Partial<Report>) => Promise<boolean>;
  handleViewReport: (report: Report) => void;
  handleBack: () => void;
  refreshReports: () => Promise<void>;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { notifySuccess, notifyError } = useToast();

  const refreshReports = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllReports();
      setReports(data);
    } catch (error) {
      notifyError('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshReports();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteReport(id);
      setReports(reports.filter(report => report.id !== id));
      notifySuccess('Report deleted successfully');
    } catch (error) {
      notifyError('Failed to delete report');
    }
  };

  const handleUpdate = async (id: string, data: Partial<Report>) => {
    setIsLoading(true);
    try {
      await updateReport(id, data);
      notifySuccess('Report updated successfully');
      await refreshReports(); // Refresh the list
      return true;
    } catch (error) {
      notifyError('Failed to update report');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleBack = () => {
    setSelectedReport(null);
  };

  const value = {
    reports,
    isLoading,
    selectedReport,
    handleDelete,
    handleUpdate,
    handleViewReport,
    handleBack,
    refreshReports
  };

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};

export const useReportsContext = () => {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReportsContext must be used within a ReportsProvider');
  }
  return context;
};
