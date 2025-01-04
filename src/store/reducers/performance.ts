import { CommonAsync } from "./managers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import { LeadList } from "../../pages/Leads/LeadsPage";
import { ManagersList } from "../../pages/KAM/Manager";
import { BaseTable } from "../../components/custom/Table/Table";
import { OrdersList } from "../../pages/Orders/OrdersPage";
import { PerfStats } from "../../pages/HomePage/HomePage";
import { BaseReport } from "../../pages/HomePage/Dashboard";

interface Leads extends BaseTable {
    leads: LeadList[];
}
interface Managers extends BaseTable {
    managers: ManagersList[];
}
interface Orders extends BaseTable {
    orders: OrdersList[];
}

interface StoreAnalytics extends CommonAsync {
    leadList: Leads;
    managers: Managers;
    orders: Orders;
    stats: PerfStats;
    report: {
        "3Days": BaseReport[];
        "7Days": BaseReport[];
        "14Days": BaseReport[];
    };
}

const initialState: StoreAnalytics = {
    isLoading: false,
    error: "",
    leadList: {
        count: 0,
        leads: [],
    },
    managers: {
        managers: [],
        count: 0,
    },
    orders: {
        count: 0,
        active: 0,
        pending: 0,
        completed: 0,
        orders: [],
    },
    stats: {
        weekly: {
            count: 0,
            closed: 0,
            pending: 0,
        },
        monthly: {
            count: 0,
            closed: 0,
            pending: 0,
        },
    },
    report: {
        "3Days": [],
        "7Days": [],
        "14Days": [],
    },
};

export const fetchLeads = createAsyncThunk("perf/getLeads", async () => {
    try {
        const { data, status } = await API.getFullLeads();

        if (status === 400 || status === 500) {
            throw new Error("error");
        } else {
            return data;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch lists");
    }
});

export const fetchOrders = createAsyncThunk("perf/getOrders", async () => {
    try {
        const { data, status } = await API.getFullOrders();

        if (status === 400 || status === 500) {
            throw new Error("error");
        } else {
            return data;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch lists");
    }
});

export const fetchMgrs = createAsyncThunk("perf/getMgrs", async () => {
    try {
        const { data, status } = await API.getFullMgrs();

        if (status === 400 || status === 500) {
            throw new Error("error");
        } else {
            return data;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch lists");
    }
});

export const fetchStats = createAsyncThunk("perf/getStats", async () => {
    try {
        const { data, status } = await API.getStats();

        if (status === 400 || status === 500) {
            throw new Error("error");
        } else {
            return data;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch lists");
    }
});

export const fetchReport = createAsyncThunk("perf/getReport", async () => {
    try {
        const { data, status } = await API.getReport();

        if (status === 400 || status === 500) {
            throw new Error("error");
        } else {
            return data;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch lists");
    }
});

export const perfSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        resetPerf() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // fetch leads
        builder.addCase(fetchLeads.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLeads.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchLeads.fulfilled, (state, action) => {
            state.isLoading = false;
            state.leadList = action.payload;
        });
        // fetch managers
        builder.addCase(fetchMgrs.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMgrs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchMgrs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.managers = action.payload;
        });
        // fetch orders
        builder.addCase(fetchOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        //fetch stats
        builder.addCase(fetchStats.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchStats.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchStats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.stats = action.payload;
        });
        // fetch report
        builder.addCase(fetchReport.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchReport.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchReport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.report = action.payload;
        });
    },
});

export const { resetPerf } = perfSlice.actions;

export default perfSlice.reducer;
