import axios, { AxiosResponse } from "axios";
import endPoint from "./constants";

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
    private handleError(err: any) {
        console.error(err);
        throw new ApiError("Error While fetching Data: " + err.message, err.response?.status);
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
            throw new Error("Error While fetching Data" + err);
        }
    }
    public async createLead(body: any): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.post(this.base_url + endPoint.getLeads, body, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data" + err);
        }
    }

    public async getLeadById(id: number): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getLeads + `/${id}`, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data" + err);
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
            throw new Error("Error While fetching Data" + err);
        }
    }

    public async getContactById(id: string): Promise<AxiosResponse> {
        try {
            const config = this.fetchConfig();
            const res = await axios.get(this.base_url + endPoint.getContacts + `/${id}`, config);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data" + err);
        }
    }
    public async logout(): Promise<AxiosResponse> {
        try {
            const res = await axios.post(this.base_url + endPoint.logout);
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data" + err);
        }
    }
    public async login(username: string, password: string): Promise<AxiosResponse> {
        try {
            const res = await axios.post(this.base_url + endPoint.login, { username, password });
            return res;
        } catch (err) {
            throw new Error("Error While fetching Data" + err);
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
            throw new Error("Error While fetching Data" + err);
        }
    }
}

const API = new Api();

export default API;
