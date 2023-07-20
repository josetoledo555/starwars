/* 
    Componen to display a list of planets, 
    parameter is the planet list.
    When the user selects a planet, 
    it will dispatch an action to fetch the residents 
*/
import React, {useEffect, useState} from 'react';
import { fetchPeople } from '../../redux/thunk/fetchPeople';
import { useDispatch, useSelector } from 'react-redux'
import { selectPlanets, selectPlanet, setSelectedPlanet } from '../../redux/slices/universeSlice';

const DropdownMenu=()=>{
    const planetList = useSelector(selectPlanets);
    const selectedPlanet = useSelector(selectPlanet);

    //const [selectedPlanet, setSelectedPlanet] = useState({});
    //const [selectedName, setSelectedName] = useState('');
    
    const dispatch = useDispatch();
    const handleSelected = (e)=>{
       // e.preventDefault();
//        setSelectedName(e.target.value)

        const planet= planetList.find((elem)=>{return elem.name===e.target.value})
        dispatch(setSelectedPlanet(planet));
        
    }

    // useEffect(()=>{
    //      dispatch(fetchPeople(selectedPlanet));      
    // },[selectedName])

    return (<div>
            <select name="selectedPlanet"
                value={selectedPlanet?.name}
                onChange={handleSelected}
                >
                <option value="Select a planet:">Select a planet:</option>
               {planetList.map((planet,i) => <option value={planet.name} key={i}>{planet.name}</option>)} 
            </select>
        </div>)
}

export default DropdownMenu