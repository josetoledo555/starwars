/*
Thunk to fetch residents in planet and store them in global state
*/

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setResidents } from '../slices/universeSlice';
import { NO_RESIDENT_FOUND, INITIAL_ERROR_STATE } from '../../constants';
export const fetchPeople = createAsyncThunk('fetchPeople', async (planet, thunkAPI) => {
  try {
      const URLS=[]
      if(planet){
        planet.residents.forEach((elem)=>{
          URLS.push(elem);
        })
  
        const allresponses = await Promise.all(
          URLS.map(url => fetch(url).then(res => res.json()))
        );
  
       const residentNames = [];
       allresponses.forEach((elem)=>{
        residentNames.push(elem.name) ;
       })
       if(residentNames.length>0){
        thunkAPI.dispatch(setError(INITIAL_ERROR_STATE));
        thunkAPI.dispatch(setResidents(residentNames));
       }else{
        thunkAPI.dispatch(setResidents([]));
        thunkAPI.dispatch(setError({
          detail: NO_RESIDENT_FOUND,
          status:404
      }))
       }
       
      return residentNames;
      }else{
        thunkAPI.dispatch(setResidents([]));
      }

  } catch (error) {
    throw Error(error.message);
  }
});