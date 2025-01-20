export interface BasicStats {
    count: number;
    closed: number;
    pending: number;
}

export type PerfStats = Record<"weekly" | "monthly", BasicStats>;

export interface BaseReport {
    lead_name: string;
    rest_name: string;
    placed_on: string;
    approved_on: string;
    order_value: number;
}

export type PageReport = Record<"3Days" | "7Days" | "14Days", BaseReport[]>;
