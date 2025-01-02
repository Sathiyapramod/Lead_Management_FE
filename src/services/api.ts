import axios, { AxiosResponse } from "axios";
import endPoint from "./constants";
import { LeadList } from "../pages/Leads/LeadsPage";
import { ContactList } from "../pages/Contacts/ContactsPage";
import { OrdersList } from "../pages/Orders/OrdersPage";

class ApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = "ApiError";
    }
}
class Api {
    private base_url: string;

    constructor() {
        this.base_url = import.meta.env.VITE_APP_API_URL;
        if (!this.base_url) {
            throw new Error("API URL is not defined");
        }
    }

    private fetchConfig() {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        return { headers };
    }
    private handleError(err: unknown) {
        throw new Error("Error While fetching Data: " + err);
    }
    private async get<T>(url: string): Promise<AxiosResponse<T> | undefined> {
        try {
            const config = this.fetchConfig();
            return await axios.get(url, config);
        } catch (err) {
            this.handleError(err);
        }
    }

    public async getLeads(query: Record<string, string>): Promise<AxiosResponse> {
        try {
            let urlParams;
            if (query) urlParams = new URLSearchParams(query).toString();
            const config = this.fetchConfig();
            const res = await axios.get(
                this.base_url + endPoint.getLeads + `?${urlParams}`,
                config
            );
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    public async createLead(body: LeadList): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.post(this.base_url + endPoint.getLeads, body, config);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }

    public async getLeadById(id: number): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getLeads + `/${id}`, config);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }

    public async getContacts(query: Record<string, string>): Promise<AxiosResponse> {
        try {
            const urlParams = new URLSearchParams(query).toString();

            const config = this.fetchConfig();
            const res = await axios.get(
                this.base_url + endPoint.getContacts + `?${urlParams}`,
                config
            );
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }

    public async getContactById(id: string): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getContacts + `/${id}`, config);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    public async createContact(body: ContactList): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.post(this.base_url + endPoint.getContacts, body, config);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }

    public async logout(): Promise<AxiosResponse> {
        try {
            const res = await axios.post(this.base_url + endPoint.logout);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    public async login(username: string, password: string): Promise<AxiosResponse> {
        try {
            const res = await axios.post(this.base_url + endPoint.login, { username, password });
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    public async getManagers(query: Record<string, string>): Promise<AxiosResponse> {
        try {
            const urlParams = new URLSearchParams(query).toString();

            const config = this.fetchConfig();
            const res = await axios.get(
                this.base_url + endPoint.getManagers + `?${urlParams}`,
                config
            );
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    public async getCallLogs(query: Record<string, string>): Promise<AxiosResponse> {
        try {
            const urlParams = new URLSearchParams(query).toString();

            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.calls + `?${urlParams}`, config);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    async getTwilioToken() {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.callToken, config);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }

    async getOrdersList(query: Record<string, string>): Promise<AxiosResponse> {
        try {
            const urlParams = new URLSearchParams(query).toString();

            const config = this.fetchConfig();
            const res = await axios.get(
                this.base_url + endPoint.getOrders + `?${urlParams}`,
                config
            );
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    async createOrder(body: Partial<OrdersList>): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.post(this.base_url + endPoint.getOrders, body, config);
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
    async updateOrder(
        isApproved: boolean,
        id: number,
        lead_id: number,
        approved_on: string
    ): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.patch(
                this.base_url + endPoint.getOrders + `/${id}`,
                {
                    isApproved,
                    lead_id,
                    approved_on,
                },
                config
            );
            return res;
        } catch (err) {
            this.handleError(err);
        }
    }
}

const API = new Api();

export default API;
