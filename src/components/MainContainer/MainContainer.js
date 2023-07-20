/* 
    This component will dispatch an action to get all the planets when it is loaded.
    Contains planet dropdown menu and resident List.
*/

import React, { useEffect } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { fetchPlanets } from '../../redux/thunk/fetchPlanets';
import { selectPlanets, selectResidents, selectError, selectPlanet } from '../../redux/slices/universeSlice';
import { useDispatch, useSelector } from 'react-redux'
import imgNotFound from '../../assets/noResidents.jpg'
import { PeopleList } from '../PeopleList';


function MainContainer(){

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPlanets(''));
    },[])
    const planetList = useSelector(selectPlanets);
    const selectedPlanet = useSelector(selectPlanet);
    const error = useSelector(selectError);

    // useEffect(()=>{
    //     if( error.status && error.status!=200){
    //         //To Do: Replace Alert with Modal & images from ../assets
    //         alert(error.detail);
    //     }
    // },[error]);

    const residentArray = useSelector(selectResidents);
    const residentList =  Array.isArray(residentArray)?residentArray.map((elem,i)=>{
        return <li key={i}>{elem}</li>
    }):null;

    return (<div>

        <div className='whiteText'>STAR WARS UNIVERSE</div>
        { planetList.length>0?<span className='whiteText'>Go!</span>:<span className='whiteText'>Loading...</span>}
        <div className='container'><DropdownMenu /></div>
        {error.status===404?<div><img src={imgNotFound}/></div>:residentList}
        {selectedPlanet&&<PeopleList/>}
    </div>)
}

export default MainContainer