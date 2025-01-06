import axios, { type AxiosResponse } from "axios";

import { ContactsList } from "../pages/Contacts/Contacts.types";
import { LeadList } from "../pages/Leads/Leads.types";
import { OrdersList } from "../pages/Orders/Orders.types";
import endPoint from "./constants";

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
            throw new Error("Error While fetching Data: " + err);
        }
    }
    public async createLead(body: LeadList): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.post(this.base_url + endPoint.getLeads, body, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    public async updateLead(body: Record<string, boolean>, id: number): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.patch(
                this.base_url + endPoint.getLeads + `/${id}`,
                body,
                config
            );
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }

    public async getLeadById(id: number): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getLeads + `/${id}`, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
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
            throw new Error("Error While fetching Data: " + err);
        }
    }

    public async getContactById(id: string): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getContacts + `/${id}`, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    public async createContact(body: ContactsList): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.post(this.base_url + endPoint.getContacts, body, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }

    public async logout(): Promise<AxiosResponse> {
        try {
            const res = await axios.post(this.base_url + endPoint.logout);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    public async login(username: string, password: string): Promise<AxiosResponse> {
        try {
            const res = await axios.post(this.base_url + endPoint.login, {
                username,
                password,
            });
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
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
            throw new Error("Error While fetching Data: " + err);
        }
    }
    public async getCallLogs(query: Record<string, string>): Promise<AxiosResponse> {
        try {
            const urlParams = new URLSearchParams(query).toString();

            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.calls + `?${urlParams}`, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async getTwilioToken() {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.callToken, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
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
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async createOrder(body: Partial<OrdersList>): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.post(this.base_url + endPoint.getOrders, body, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async updateOrder({
        isApproved,
        id,
        lead_id,
        approved_on,
        closed_on,
    }: {
        isApproved: boolean;
        id: number;
        lead_id: number;
        approved_on?: string;
        closed_on?: string;
    }): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.patch(
                this.base_url + endPoint.getOrders + `/${id}`,
                {
                    isApproved,
                    lead_id,
                    approved_on,
                    closed_on,
                },
                config
            );
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }

    async getFullLeads(): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getFullLeads, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async getFullOrders(): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getFullOrders, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async getFullMgrs(): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getFullMgrs, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async getStats(): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getStats, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async getReport(): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getReport, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
    async getOrderById(id: number): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getOrders + `/${id}`, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data: " + err);
        }
    }
}

const API = new Api();

export default API;
