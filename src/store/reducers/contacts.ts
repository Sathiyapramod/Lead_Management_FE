import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import { ContactList } from "../../pages/Contacts/ContactsPage";

interface StoreContactList {
    isLoading: boolean;
    error: string;
    currentContact: ContactList;
    contactList: ContactList[];
}

const initialState: StoreContactList = {
    isLoading: false,
    error: "",
    currentContact: {
        id: 0,
        lead_id: 0,
        cnct_name: "",
        cnct_info: "",
        cnct_role: "procurement",
        phone: "",
        created_at: "",
        updated_at: "",
    },
    contactList: [],
};

export const fetchContacts = createAsyncThunk(
    "contacts/get",
    async ({ limit, offset, searchName }: Record<string, string>, { rejectWithValue }) => {
        try {
            const { data, status } = await API.getContacts({ limit, offset, searchName });

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

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        resetState() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchContacts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.contactList = action.payload;
        });
    },
});

export const { resetState } = contactSlice.actions;

export default contactSlice.reducer;
