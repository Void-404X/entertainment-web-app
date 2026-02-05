import {createAsyncThunk} from '@reduxjs/toolkit';

export interface Trailer {
	id: number;
	title: string;
	genre: string;
	video_file: string;
	preview_image: string;
	release_year: number;
	age_rating: string;
	created_at: string;
}

export const fetchTrailers = createAsyncThunk<
	Trailer[],
	void,
	{ rejectValue: string }
>(
	'trailers/fetchTrailers',
	async (_, { rejectWithValue }) => {
		try {
			const res = await fetch('http://127.0.0.1:8000/api/trailers/');
			
			if (!res.ok) {
				throw new Error('Server error');
			}
			return await res.json()
		} catch {
			return rejectWithValue('Failed to load trailers');
		}
	}
);
