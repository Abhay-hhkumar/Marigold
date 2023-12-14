import React,{useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';


const Trending = () => {

    const [endpoint,setEndpoint]=useState("day");

    // " /trending/all/${endpoint} " this is given in TMBD website in API reference section
    //"all" means it will give "day wise" as well as "week wise" both
    // we can write "day" or "week" insted of "all"
    // make sure there should not space present after backtic `
    const { data, loading}= useFetch(`/trending/all/${endpoint}`);
    
    // here whenever we change the tab (i.e from "day " to "week" or viseversa) then we call an api to fetch data accordengly
    const onTabChange= (tab) =>{
        setEndpoint(tab ==="Day" ? "day" : "week");

    }
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
        <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange} />
    </ContentWrapper>
    {/* const { data, loading}= useFetch(`/trending/all/${endpoint}`); */}
    <Carousel data={data?.results} loading={loading}/>
      
    </div>
  )
}

export default Trending
