import { useSelector } from "react-redux";
import { selectPlanet } from "../redux/slices/universeSlice";
import { useState } from "react";

const MAX_PEOPLE_PAGE=2
export const PeopleList = ()=>{
    const selectedPlanet = useSelector(selectPlanet);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = selectedPlanet?.residents.lenght/MAX_PEOPLE_PAGE;
    

    return <div>
        {totalPages>1&&<div><button>PREV</button></div>}<div>
        </div>
        people list</div>
}

