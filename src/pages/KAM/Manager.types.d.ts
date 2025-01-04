export interface ManagersList {
  id: number;
  mgr_name: string;
  role: 'manager' | 'admin';
  phone: string;
  leads?: number;
}
