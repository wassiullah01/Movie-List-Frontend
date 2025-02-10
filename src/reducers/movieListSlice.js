import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: JSON.parse(localStorage.getItem('movies')) || []
};

const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
            localStorage.setItem('movies', JSON.stringify(action.payload));
        },
        addMovie: (state, action) => {
            state.movies.push(action.payload);
            localStorage.setItem('movies', JSON.stringify(state.movies));
        },
        deleteMovie: (state, action) => {
            state.movies.splice(action.payload, 1);
            localStorage.setItem('movies', JSON.stringify(state.movies));
        },
        updateMovie: (state, action) => {
            const { index, movie } = action.payload;
            state.movies[index] = movie;
            localStorage.setItem('movies', JSON.stringify(state.movies));
        }
    },
});

export const { setMovies, addMovie, deleteMovie, updateMovie } = movieListSlice.actions;
// export const selectMovies = (state) => state.movieList.movies;
export default movieListSlice.reducer;