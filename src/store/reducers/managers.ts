import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ManagersList } from '../../pages/KAM/Manager.types';
import API from '../../services/api';
import { CommonAsync } from './store.types';

interface StoreMgrList extends CommonAsync {
  currentMgr: ManagersList;
  MgrList: ManagersList[];
}

const initialState: StoreMgrList = {
  isLoading: false,
  error: '',
  currentMgr: {
    id: 0,
    mgr_name: '',
    phone: '',
    role: 'manager',
  },
  MgrList: [],
};

export const fetchManagers = createAsyncThunk('managers/getList', async () => {
  try {
    const { data, status } = await API.getManagers({});

    if (status === 400 || status === 500) {
      return 'error';
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
});

export const managerSlice = createSlice({
  name: 'managers',
  initialState,
  reducers: {
    resetMgrs() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchManagers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchManagers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchManagers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.MgrList = action.payload;
    });
  },
});
export const { resetMgrs } = managerSlice.actions;

export default managerSlice.reducer;
