/* 
    Componen to display a list of planets, 
    parameter is the planet list.
    When the user selects a planet, 
    it will dispatch an action to fetch the residents 
*/
import React, {useEffect, useState} from 'react';
import { fetchPeople } from '../../redux/thunk/fetchPeople';
import { useDispatch } from 'react-redux'

const DropdownMenu=(props)=>{
    const [selectedPlanet, setSelectedPlanet] = useState({});
    const [selectedName, setSelectedName] = useState('');
    
    const dispatch = useDispatch();
    const handleSelected = (e)=>{
        e.preventDefault();
        setSelectedName(e.target.value)

        const planet= props.planetList.filter((elem)=>{return elem.name===e.target.value})
        setSelectedPlanet(planet[0]);
    }

    useEffect(()=>{
         dispatch(fetchPeople(selectedPlanet));      
    },[selectedName])

    return (<div>
            <select name="selectedPlanet"
                value={selectedName}
                onChange={handleSelected}
                >
                <option value="Select a planet:">Select a planet:</option>
               {props.planetList.map((planet,i) => <option value={planet.name} key={i}>{planet.name}</option>)} 
            </select>
        </div>)
}

export default DropdownMenu