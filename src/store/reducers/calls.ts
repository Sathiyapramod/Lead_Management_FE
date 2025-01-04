import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';

import { LeadList } from '../../pages/Leads/Leads.types';
import API from '../../services/api';

interface StoreLeadList {
  isLoading: boolean;
  error: string;
  callSchedule: {
    count: number;
    completed: number;
    leads: LeadList[];
  };
}

const initialState: StoreLeadList = {
  isLoading: false,
  error: '',
  callSchedule: {
    count: 0,
    completed: 0,
    leads: [],
  },
};

export const fetchCallLogs = createAsyncThunk(
  'calls/callSchedule',
  async ({ date, offset }: Record<string, string>, { rejectWithValue }) => {
    try {
      const { data, status } = await API.getCallLogs({
        date,
        limit: '10',
        offset,
      });

      if (status === 400 || status === 500) {
        return rejectWithValue('error');
      } else {
        return data;
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue('Failed to fetch posts');
    }
  },
);

export const callSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    resetCalls() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCallLogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCallLogs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchCallLogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.callSchedule = action.payload;
    });
  },
});

export const { resetCalls } = callSlice.actions;

export default callSlice.reducer;
