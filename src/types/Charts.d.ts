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

export type PharyngitisStageChart = {
    stage: string;
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

export type PharyngitisReportsData = {
    diagnosisStatus: DiagnosisStatusChart[];
    pharyngitisStage: PharyngitisStageChart[];
    confidenceScores: ConfidenceScoreDistributionChart[];
    pharyngitisVsHealthy: DiseaseVsHealthyChart[];
}
