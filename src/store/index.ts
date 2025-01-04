import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import leadReducer from "./reducers/leads";
import callReducer from "./reducers/calls";
import contactReducer from "./reducers/contacts";
import managerReducer from "./reducers/managers";
import perfReducer from "./reducers/performance";

const store = configureStore({
    reducer: {
        leads: leadReducer,
        calls: callReducer,
        contacts: contactReducer,
        managers: managerReducer,
        analytics: perfReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
