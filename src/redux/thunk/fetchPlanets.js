/*
Thunk to fetch planets and store them in global state
*/
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, PLANET_PAGE_LIST, PLANETS } from "../../constants";
import { setPlanets, setError, resetUniverse } from "../slices/universeSlice";

export const fetchPlanets = createAsyncThunk(
  "fetchPlanets",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL + PLANETS, {
        method: "GET",
      });
      const jsonResponse = await response.json();
      if (response.status === 200) {
        const count = jsonResponse.count;
        const URLS = [];

        // every page has 10 planets so we divide by 10 and generate the URLs
        for (let i = 1; i <= count / 10; i++) {
          URLS.push(BASE_URL + PLANET_PAGE_LIST + i);
        }

        //request all planets
        const allresponses = await Promise.all(
          URLS.map((url) => fetch(url).then((res) => res.json()))
        );

        const allPlanets = [];
        allresponses.forEach((elem) => {
          allPlanets.push(elem.results);
        });
        //we have an array of arrays, we need a flat array
        const planetDictionary = allPlanets.flat();

        //store all planets 
        thunkAPI.dispatch(setPlanets(planetDictionary));
      } else if (response.status >= 400) {
        thunkAPI.dispatch(resetUniverse());
        thunkAPI.dispatch(
          setError({ status: response.status, detail: jsonResponse.detail })
        );
      }
      return jsonResponse;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
