/* 
    This component will dispatch an action to get all the planets when it is loaded.
    Contains planet dropdown menu and resident List.
*/

import React, { useEffect } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { fetchPlanets } from '../../redux/thunk/fetchPlanets';
import { selectPlanets, selectResidents, selectError } from '../../redux/slices/universeSlice';
import { useDispatch, useSelector } from 'react-redux'

function MainContainer(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPlanets(''));
    },[])

    const error = useSelector(selectError);

    useEffect(()=>{
        if( error.status && error.status!=200){
            //To Do: Replace Alert with Modal & images from ../assets
            alert(error.detail);
        }
    },[error]);

    const planetList = useSelector(selectPlanets);
    const residentArray = useSelector(selectResidents);
    const residentList =  Array.isArray(residentArray)?residentArray.map((elem,i)=>{
        return <li key={i}>{elem}</li>
    }):null;

    return (<div>

        <div className='whiteText'>STAR WARS UNIVERSE</div>
        {Array.isArray(planetList) && planetList.length>0?<span className='whiteText'>Go!</span>:<span className='whiteText'>Loading...</span>}
        <div className='container'><DropdownMenu planetList={ Array.isArray(planetList)?planetList:[]}/></div>
        {residentList}
    </div>)
}

export default MainContainer