import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';





import './style.scss'
const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate= useNavigate();
  const { url }=useSelector((state)=> state.home)


  // we give url of upcoming movie
  const {data, loading} = useFetch("/movie/upcoming")

  useEffect(() => {
    //  results[ Math.floor(Math.random()*20)].backdrop_path will not run untill the value of "data" is undefined or empty (this is why we used " ?. " and this is called optional chaining)
    const bg = url.backdrop + data?.results?.[ Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);

  },[data])
  const searchQueryHandler = (event) =>{
    if(event.key === "Enter" && query.length > 0){
     navigate(`/search/${query}`);
    }
  }
  const search = ()=>{
    navigate(`/search/${query}`);
  }

  return (
    <div className="heroBanner">
   { !loading &&  <div className="backdrop-img"> 
                   <Img src={background} />
                   </div>
    }

    {/* // we create a div to give gradient just below the header banner */}
    <div className="opacity-layer"></div>
     <ContentWrapper>
     
      <div className="heroBannerContent">
        <span className="title">Hello  </span>
        <span className="subTitle">Millions of movie, TV shows and people to discover, Explore now.</span>
        
        <div className='searchInput'>
          <input type="text" onChange={(e)=> setQuery(e.target.value)} onKeyUp={searchQueryHandler} placeholder="Search for Movie or TV show.." />
          <button onClick={search}>Search</button>
        </div>
      </div>
   
     </ContentWrapper>
    
    
      
    </div>
  )
}

export default HeroBanner
