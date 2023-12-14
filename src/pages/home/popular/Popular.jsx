import React,{useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';


const Popular = () => {

    const [endpoint,setEndpoint]=useState("movie");

    // " /trending/all/${endpoint} " this is given in TMBD website in API reference section
    //"all" means it will give "day wise" as well as "week wise" both
    // we can write "day" or "week" insted of "all"
    // make sure there should not space present after backtic `
    const { data, loading}= useFetch(`/${endpoint}/popular`);
    
    // here whenever we change the tab (i.e from "day " to "week" or viseversa) then we call an api to fetch data accordengly
    const onTabChange= (tab) =>{
        setEndpoint(tab ==="Movies" ? "movie" : "tv");

    }
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className='carouselTitle'>What's Popular</span>
        <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange} />
    </ContentWrapper>
    {/* const { data, loading}= useFetch(`/trending/all/${endpoint}`); */}
    <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
      
    </div>
  )
}

export default Popular;
