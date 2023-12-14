import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

const Genres = ( { data} ) => {

    // "data" contain object of each movies
    const {genres} = useSelector((state)=> state.home);

      return (

        <div className="genres">

          {data?.map((g)=>{

          // we return nothing if "genres " have no value
           if( !genres[g]?.name){
            return ;
           }
          return (
              <div key={g} className="genre"> {genres[g]?.name} </div>
             )
             })} 
       </div>
  )
}

// when we are in desktop mode we have to show the genres and we dont show "genres" in mobile mode

export default Genres
