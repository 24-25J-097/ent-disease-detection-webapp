import { useReportsContext } from '../providers/ReportsProvider';

export const useReports = () => {
  return useReportsContext();
};
