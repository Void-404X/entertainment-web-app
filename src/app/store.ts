import {configureStore} from '@reduxjs/toolkit';
import trailersReducer from '../features/trailers/trailerSlice';

export const store = configureStore({
	reducer: {
		trailers: trailersReducer,
	},
});

// экспортируем тип dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
