export interface BasicStats {
  count: number;
  closed: number;
  pending: number;
}

export interface PerfStats {
  weekly: BasicStats;
  monthly: BasicStats;
}

export interface BaseReport {
  lead_name: string;
  rest_name: string;
  placed_on: string;
  approved_on: string;
  order_value: number;
}

export interface PageReport {
  '3Days': BaseReport[];
  '7Days': BaseReport[];
  '14Days': BaseReport[];
}
