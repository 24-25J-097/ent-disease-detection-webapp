import React from "react";
import {TableColumn, TableRow} from '@/types/DataTable';

declare type AuthMiddleware = 'auth' | 'guest'

export interface IUseAuth {
    middleware: AuthMiddleware;
    redirectIfAuthenticated?: string;
}

export interface IApiRequest {
    setErrors?: React.Dispatch<React.SetStateAction<never[]>>;
    [key: string]: any;
}

export type UseExportFilesProps = {
    fileName: string;
    tableName?: string;
    filteredData: TableRow[];
    columns: TableColumn[];
    tableId: string;
};

export type ExportFileOption = {
    id: number;
    label: string;
    type: string;
    onClick: () => void;
};

export type UsePrintProps = {
    name: string;
    tableId: string;
};
