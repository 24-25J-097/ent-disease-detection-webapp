export type DiagnosisStatusChart = {
    name: string;
    value: number;
}

export type DiseaseVsHealthyChart = {
    name: string;
    value: number;
}

export type SinusitisSeverityChart = {
    severity: string;
    count: number;
}

export type ConfidenceScoreDistributionChart = {
    scoreRange: string;
    count: number;
}

export type SinusitisReportsData = {
    diagnosisStatus: DiagnosisStatusChart[];
    sinusitisSeverity: SinusitisSeverityChart[];
    confidenceScores: ConfidenceScoreDistributionChart[];
    sinusitisVsHealthy: DiseaseVsHealthyChart[];
}
