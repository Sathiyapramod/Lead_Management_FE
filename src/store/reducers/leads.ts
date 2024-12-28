import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LeadList } from "../../pages/Leads/LeadsPage";
import API from "../../services/api";

interface StoreLeadList {
    isLoading: boolean;
    error: string;
    currentLead: LeadList;
}

const initialState: StoreLeadList = {
    isLoading: false,
    error: "",
    currentLead: {
        id: 0,
        lead_name: "",
        rest_name: "",
        rest_addr1: "",
        phone: "",
        mgr_id: "",
        lead_status: false,
        call_freq: "",
        last_call_date: "",
        orders_placed: 0,
        orders_done: 0,
        created_at: "",
        updated_at: "",
    },
};

export const fetchLeadById = createAsyncThunk(
    "leads/getLeads",
    async (id: number, { rejectWithValue }) => {
        try {
            const { data, status } = await API.getLeadById(id);

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

export const postSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        resetState() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeadById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLeadById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchLeadById.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.currentLead = action.payload;
        });
    },
});

export const { resetState } = postSlice.actions;

export default postSlice.reducer;
