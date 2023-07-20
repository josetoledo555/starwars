export const BASE_URL="https://swapi.dev/api";
export const PLANETS="/planets";
export const PLANET_PAGE_LIST="/planets/?page=";
export const PEOPLE_PAGE_LIST="/people/";
export const MAX_PEOPLE_PAGE = 10;

export const INITIAL_UNIVERSE_STATE = {
    error: {},
    planets:[],
    selectedPlanet:{},
    residents:[]
};

export const INITIAL_ERROR_STATE = {
    detail: "",
    status:200
};

export const NO_RESIDENT_FOUND = "No Residents Found";