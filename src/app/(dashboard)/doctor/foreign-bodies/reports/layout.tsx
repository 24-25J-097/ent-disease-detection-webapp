import React from 'react';
import { ReportsProvider } from './providers/ReportsProvider';

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReportsProvider>
      <div className="bg-blue-50 min-h-screen">
        {children}
      </div>
    </ReportsProvider>
  );
}
