export type ContactRole = "owner" | "procurement" | "sales" | "general manager" | "chef";

export interface ContactsList {
    id?: number;
    lead_id: number;
    cnct_name: string;
    cnct_role: ContactRole;
    cnct_info: string;
    phone: string;
    created_at?: string;
    updated_at?: string;
}
