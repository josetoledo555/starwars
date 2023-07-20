/*
Thunk to fetch residents in planet and store them in global state
This thunk receive the slice of residents to request, i.e. 0-10, 10-20, etc
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setResidents } from "../slices/universeSlice";
import { NO_RESIDENT_FOUND, INITIAL_ERROR_STATE } from "../../constants";
export const fetchPeople = createAsyncThunk(
  "fetchPeople",
  async (residents, thunkAPI) => {
    try {
      const URLS = [];

      if (residents) {
        residents.forEach((elem) => {
          URLS.push(elem);
        });

        //request residents
        const allresponses = await Promise.all(
          URLS.map((url) => fetch(url).then((res) => res.json()))
        );

        const residentNames = [];
        allresponses.forEach((elem) => {
          residentNames.push(elem.name);
        });

        if (residentNames.length > 0) {
          //store residents
          thunkAPI.dispatch(setError(INITIAL_ERROR_STATE));
          thunkAPI.dispatch(setResidents(residentNames));
        } else {
          //if no residents, set values to display proper message
          thunkAPI.dispatch(setResidents([]));
          thunkAPI.dispatch(
            setError({
              detail: NO_RESIDENT_FOUND,
              status: 404,
            })
          );
        }

        return residentNames;
      } else {
        thunkAPI.dispatch(setResidents([]));
      }
    } catch (error) {
      throw Error(error.message);
    }
  }
);
