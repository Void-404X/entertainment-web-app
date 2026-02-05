import {createSlice} from '@reduxjs/toolkit';
import type {Trailer} from './trailerThunks';
import {fetchTrailers} from './trailerThunks';
import type {RootState} from '../../app/store';

interface TrailerState {
	value: Trailer[];
	loading: boolean;
	error: string | null;
}

const initialState: TrailerState = {
	value: [],
	loading: false,
	error: null,
};

const trailerSlice = createSlice({
	name: 'trailers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTrailers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTrailers.fulfilled, (state, action) => {
				state.loading = false;
				state.value = action.payload;
			})
			.addCase(fetchTrailers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Error';
			});
	},
});

export const selectTrailers = (state: RootState) => state.trailers.value;
export const selectLoading = (state: RootState) => state.trailers.loading;
export const selectError = (state: RootState) => state.trailers.error;

export default trailerSlice.reducer;
