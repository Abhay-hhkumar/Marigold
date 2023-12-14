
import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill,} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircleRating from "../circleRating/CircleRating";

// "dayjs" use to conver the date format to normal format like 'jun 18, 2023' in carousel
// we convert he date format because api give the date in this ( release_date:"2023-11-22") format
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import Genres from "../genres/Genres";

import "./style.scss";

// here we dstructure the { data, loading, endpoint,title} properties
const Carousel = ( { data, loading, endpoint,title} ) => {

     // useRef() is use to select any specific div or element
     const carouselContainer =useRef();
     const {url}= useSelector((state)=>state.home);
     const navigate = useNavigate();

     // scroll the carousel bar when we click on the arrow ( 'left <' or 'right >' )
     const navigation = (dir)=>{
     const container = carouselContainer.current;
     const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth) + 20 : container.scrollLeft + (container.offsetWidth) + 20

     // give the smooth scroll behaviour while we scroll horizontally to the corausal
     container.scrollTo( {
         left: scrollAmount,
         behavior: "smooth",
         })

     }



     // "skItem" means skeleten item
     const skItem = () =>{
         return(
             <div className="skeletonItem">
                 <div className="posterBlock skeleton"></div>
                 <div className="textBlock"></div>
                 <div className="title skeleton"></div>
                 <div className="date skeleton"></div>
             </div>
         )
     }

  return (
    <>

    <div ref={carouselContainer} className="carousel">
      <ContentWrapper>
         {title && <div className="carouselTitle">{title}</div>}

         {/* //<BsFillArrowLeftCircleFill  it use to add left and right arrow in carousel like <...> */}
         <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>navigation("left")} />
         <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>navigation("right")} />

         {/* here we code each card */}
         { !loading ? (
 
         <div className = "carouselItems" ref={carouselContainer}>
             {/* we always use ?. when we work on api data */}
             {data?.map((item)=>{
                 {/* "poster_path" is given in api */}
                 const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;

                 return (

                     <div key = {item.id} 
                         className="carouselItem" 
                         onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>

                         <div className="posterBlock">
                             <Img src={posterUrl}  />
                             {/* "vote_average" is already given in api to get rating */}
                             {/* we use .toFixed(1) it will give only one value after point if rating have more than one value after point like 7.9214 */}
                             <CircleRating rating={item.vote_average.toFixed(1)}/>
                             <Genres data={item.genre_ids.slice(0,2)} />
                         </div>

                         <div className="textBlock">
                             <span className="title"> {item.title || item.name}</span>
                             <span className="date">{ dayjs(item.release_Date).format("MMM D, YYYY")}</span>
                         </div>

                        </div>
                    )
             })}
            </div>

            ) : (
           
            <div className="loadingSkeleton">
             {/* show the skeleton lazy load while data is fetching */}

                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                
            </div>
            ) }

    </ContentWrapper>
      
    </div>
    </>
  )
}

export default Carousel
