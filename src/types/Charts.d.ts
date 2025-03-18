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

export type ConfidenceScoreDistributionChart = {
    scoreRange: string;
    count: number;
}

export type CholesteatomaReportsData = {
    diagnosisAcceptedVsRejected: DiagnosisAcceptedVsRejectedChart[];
    diagnosisStatus: DiagnosisStatusChart[];
    cholesteatomaStages: CholesteatomaStagesChart[];
    confidenceScores: ConfidenceScoreDistributionChart[];
    cholesteatomaVsHealthy: DiseaseVsHealthyChart[];
}
