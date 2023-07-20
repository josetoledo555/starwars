/* 
    This component will dispatch an action to get all the planets when it is loaded.
    Contains planet dropdown menu and resident List.
*/

import React, { useEffect } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { fetchPlanets } from "../../redux/thunk/fetchPlanets";
import {
  selectPlanets,
  selectError,
  selectPlanet,
} from "../../redux/slices/universeSlice";
import { useDispatch, useSelector } from "react-redux";
import imgNotFound from "../../assets/noResidents.jpg";
import { PeopleList } from "../PeopleList/PeopleList";

function MainContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlanets(""));
  }, [dispatch]);

  const planetList = useSelector(selectPlanets);
  const selectedPlanet = useSelector(selectPlanet);
  const error = useSelector(selectError);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "40px" }}>
      <div className="whiteText">STAR WARS UNIVERSE</div>
      {planetList.length > 0 ? (
        <span className="whiteText">Go!</span>
      ) : (
        <span className="whiteText">Loading...</span>
      )}
      <div className="container">
        <DropdownMenu />
      </div>
      {error.status === 404 && (
        <div>
          <img style={{ height: "400px", width: "400px" }} src={imgNotFound} />
        </div>
      )}
      {selectedPlanet && <PeopleList />}
    </div>
  );
}

export default MainContainer;
