/*
Slice with initial state, selectors and reducers
*/
import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_UNIVERSE_STATE } from '../../constants';

const initialState = INITIAL_UNIVERSE_STATE
export const universe = createSlice({
  name: 'universe',
  initialState,
  reducers: {
    setPlanets:(state, action)=>{
        state.planets = action.payload;
    },
    setResidents:(state, action)=>{
      state.residents = action.payload;
    },
    setError:(state, action)=> {
      state.error= action.payload
    },
    resetUniverse: () => initialState,
  },
});

export const { resetUniverse, setPlanets, setResidents, setError } =  universe.actions;
export const selectPlanets = (state) => state.universe.planets;
export const selectResidents = (state) => state.universe.residents;
export const selectError = (state) => state.universe.error;

export default universe.reducer;