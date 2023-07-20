/*
This component display a list of residents
Implements pagination

*/

import { useDispatch, useSelector } from "react-redux";
import {
  selectPlanet,
  selectResidents,
  setError,
  setResidents,
} from "../../redux/slices/universeSlice";
import { useEffect, useState } from "react";
import { fetchPeople } from "../../redux/thunk/fetchPeople";
import {MAX_PEOPLE_PAGE} from "../../constants";

export const PeopleList = () => {
  const dispatch = useDispatch();

  const selectedPlanet = useSelector(selectPlanet);
  const fetchedResidents = useSelector(selectResidents);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    selectedPlanet?.residents?.length / MAX_PEOPLE_PAGE
  );

  // variables to generate pagination 0-10, 10-20, etc.
  const startIndex = (currentPage - 1) * MAX_PEOPLE_PAGE;
  const endIndex = (currentPage - 1) * MAX_PEOPLE_PAGE + MAX_PEOPLE_PAGE;

  //get a slice/pagination from total residents array
  const tempResidents = selectedPlanet?.residents?.slice(startIndex, endIndex);

  //get fresh list of residents when user changes the page or select a new planet.
  useEffect(() => {
    dispatch(fetchPeople(tempResidents));
  }, [currentPage, selectedPlanet]);

  //reset everytime we select a planet
  useEffect(() => {
    setCurrentPage(1);
    dispatch(setResidents([]));
    dispatch(setError({}));
  }, [selectedPlanet]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div style={{ color: "white" }}>
      <ul>
        {fetchedResidents.map((resident, index) => (
          <li style={{ color: 'black', height: '40px', fontWeight: 'bold', display: 'flex', justifyContent: 'center' ,alignItems:'center'}} key={index}>
            {resident}
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div>
          <button disabled={currentPage === 1} onClick={handlePrev}>
            PREV
          </button>
          <button disabled={currentPage === totalPages} onClick={handleNext}>
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};
