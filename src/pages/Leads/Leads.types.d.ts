export interface LeadList {
    id: number;
    lead_name: string;
    rest_name: string;
    rest_addr1: string;
    rest_addr2: string;
    phone: string;
    mgr_id: number;
    lead_status?: boolean;
    call_freq: "weekly" | "daily";
    last_call_date?: string;
    orders_placed?: number;
    orders_done?: number;
    created_at: string;
    updated_at: string;
}
