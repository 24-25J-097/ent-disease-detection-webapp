'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Report } from '../types/types';

interface ReportsListProps {
  reports: Report[];
  onView: (report: Report) => void;
  onUpdate: (report: Report) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  onView,
  onUpdate,
  onDelete,
  searchQuery = ''
}) => {
  const [localPatientFilter, setLocalPatientFilter] = useState('');
  const [localNoteFilter, setLocalNoteFilter] = useState('');

  useEffect(() => {
    if (searchQuery) {
      setLocalPatientFilter('');
      setLocalNoteFilter('');
    }
  }, [searchQuery]);

  const filteredReports = reports.filter(report => {
    if (searchQuery) {
      return report.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
             report.note.toLowerCase().includes(searchQuery.toLowerCase());
    }

    const matchesPatientId = !localPatientFilter || 
      report.patientId.toLowerCase().includes(localPatientFilter.toLowerCase());
    const matchesNote = !localNoteFilter || 
      report.note.toLowerCase().includes(localNoteFilter.toLowerCase());
    
    return matchesPatientId && matchesNote;
  });

  return (
    <div className="bg-blue-50 min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-6">Reports List</h1>

      {!searchQuery && (
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Filter by Patient ID"
              value={localPatientFilter}
              onChange={(e) => setLocalPatientFilter(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Filter by Note"
              value={localNoteFilter}
              onChange={(e) => setLocalNoteFilter(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-right">Patient ID</th>
            <th className="py-3 px-4 text-right">Note</th>
            <th className="py-3 px-4 text-right">X-Ray Image</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map(report => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                {report.patientId}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                {report.note}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
              <div
                    className="relative w-20 h-20 cursor-pointer ml-auto"
                    onClick={() => onView(report)}>
                    <Image
                      src={report.imageUrl}
                      alt={`X-Ray for patient ${report.patientId}`}
                      fill
                      sizes="80px"
                      className="object-cover rounded-md hover:opacity-75 transition-opacity"
                    />
                  </div>
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                
                <button
                  onClick={() => onUpdate(report)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(report.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredReports.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No reports found matching your filters
        </div>
      )}
    </div>
  );
};

export default ReportsList;