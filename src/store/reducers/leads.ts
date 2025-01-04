import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LeadList } from "../../pages/Leads/LeadsPage";
import API from "../../services/api";
import { BaseTable } from "../../components/custom/Table/Table";
import { CommonAsync } from "./managers";

interface Leads extends BaseTable {
    leads: LeadList[];
}

interface StoreLeadList extends CommonAsync {
    leadList: Leads;
}

const initialState: StoreLeadList = {
    isLoading: false,
    error: "",
    leadList: {
        count: 0,
        leads: [],
    },
};

export const fetchLeadLists = createAsyncThunk(
    "leads/getLeads",
    async ({ limit, offset, searchName }: Record<string, string>, { rejectWithValue }) => {
        try {
            const { data, status } = await API.getLeads({ limit, offset, searchName });

            if (status === 400 || status === 500) {
                return rejectWithValue("error");
            } else {
                return data;
            }
        } catch (err) {
            console.log(err);
            return rejectWithValue("Failed to fetch posts");
        }
    }
);

export const leadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        resetLeads() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeadLists.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLeadLists.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchLeadLists.fulfilled, (state, action) => {
            state.isLoading = false;
            state.leadList = action.payload;
        });
    },
});

export const { resetLeads } = leadSlice.actions;

export default leadSlice.reducer;
