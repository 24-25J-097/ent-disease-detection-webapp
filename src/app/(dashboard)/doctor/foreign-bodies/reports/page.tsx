'use client';
import React, { useState } from 'react';
import { NextPage } from 'next';
import LoadingModal from '@/components/loaders/LoadingModal';
import ReportsList from './components/ReportsList';
import ReportDetail from './components/ReportDetail';
import UpdateReportModal from './components/UpdateReportModal';
import { useReports } from './hooks/useReports';
import { Report } from './types/types';
import { ReportsProvider } from './providers/ReportsProvider';

const ReportsContent: React.FC = () => {
  const {
    reports,
    isLoading,
    selectedReport,
    handleDelete,
    handleUpdate,
    handleViewReport,
    handleBack
  } = useReports();
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [reportToUpdate, setReportToUpdate] = useState<Report | null>(null);

  const handleUpdateClick = (report: Report) => {
    setReportToUpdate(report);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setReportToUpdate(null);
  };

  if (isLoading) {
    return (
      <LoadingModal
        isOpen={isLoading}
        text="Loading"
        imagePath="/images/medical-analyzing.gif"
      />
    );
  }

  if (selectedReport) {
    return (
      <ReportDetail 
        report={selectedReport} 
        onBack={handleBack} 
      />
    );
  }

  return (
    <>
      <ReportsList
        reports={reports}
        onView={handleViewReport}
        onUpdate={handleUpdateClick}
        onDelete={handleDelete}
      />
      
      {reportToUpdate && (
        <UpdateReportModal
          report={reportToUpdate}
          isOpen={showUpdateModal}
          isLoading={isLoading}
          onClose={handleCloseUpdateModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

const ReportsPage: NextPage = () => {
  return (
    <ReportsProvider>
      <ReportsContent />
    </ReportsProvider>
  );
};

export default ReportsPage;
