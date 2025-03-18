export type DiagnosisStatusChart = {
    name: string;
    value: number;
}

export type DiseaseVsHealthyChart = {
    name: string;
    value: number;
}


export type DiagnosisAcceptedVsRejectedChart = {
    name: string;
    value: number;
}

export type CholesteatomaStagesChart = {
    stage: string;
    count: number;
}


export type CholesteatomaReportsData = {
    diagnosisAcceptedVsRejected: DiagnosisAcceptedVsRejectedChart[];
    diagnosisStatus: DiagnosisStatusChart[];
    cholesteatomaStages: CholesteatomaStagesChart[];
    confidenceScores: ConfidenceScoreDistributionChart[];
    cholesteatomaVsHealthy: DiseaseVsHealthyChart[];
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
