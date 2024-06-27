// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import programCreateReducer from './programCreateSlice';

const store = configureStore({
    reducer: {
        programCreate: programCreateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
