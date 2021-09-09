import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharacters, fetchMovies } from './starwarsAPI';

const initialState = {
  characters: [],
  selectedCharacter: null,
  movies: [],
  isLoading: false,
  errored: false
};

export const fetchCharactersAsync = createAsyncThunk(
  'starwars/fetchCharacters',
  fetchCharacters
);

export const fetchMoviesAsync = createAsyncThunk(
  'starwars/fetchMovies',
  async (characterName, thunkApi) => {
    const { starwars } = thunkApi.getState();
    const characterInfo = starwars.characters.find(char => char.name === characterName);
    const movies = await fetchMovies(characterInfo.films);
    return movies;
  }
);

export const starwarsSlice = createSlice({
  name: 'starwars',
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCharactersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload;
      })
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.movies = action.payload;
      });
  },
});

export const { setCharacter } = starwarsSlice.actions;

export const selectCharacterNames = (state) => state.starwars.characters.map(character => character.name);
export const selectMovies = (state) => state.starwars.movies;
export const isDataLoading = (state) => state.starwars.isLoading;

export default starwarsSlice.reducer;
