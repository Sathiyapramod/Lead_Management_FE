export interface OrdersList {
  id: number;
  lead_id: number;
  lead_name: string;
  order_value: number;
  placed_on: string;
  closed_on: string;
  approved_on: string;
  isApproved: boolean;
  isCreated: boolean;
  created_at?: string;
  updated_at?: string;
}
