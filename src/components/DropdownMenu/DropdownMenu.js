/* 
    Componen to display a list of planets, 
    Get from redux the planet list.
    When the user selects a planet, it will dispatch an action to fetch the residents 
*/

import { useDispatch, useSelector } from "react-redux";
import {
  selectPlanets,
  selectPlanet,
  setSelectedPlanet,
} from "../../redux/slices/universeSlice";

const DropdownMenu = () => {
  const planetList = useSelector(selectPlanets);
  const selectedPlanet = useSelector(selectPlanet);
  const dispatch = useDispatch();

  const handleSelected = (e) => {
    const planet = planetList.find((elem) => {
      return elem.name === e.target.value;
    });
    dispatch(setSelectedPlanet(planet));
  };

  return (
    <div>
      <select
        name="selectedPlanet"
        value={selectedPlanet?.name}
        onChange={handleSelected}
        disabled={planetList.length === 0}
        style={{ height: "30px", width: "200px" }}
      >
        <option value="Select a planet:">Select a planet:</option>
        {planetList.map((planet, i) => (
          <option value={planet.name} key={i}>
            {planet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
