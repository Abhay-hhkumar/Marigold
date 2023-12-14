import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";


// "data" it hhave data of individual "movie" or "tv show"
// "fromSearch" it check data is coming from search tab or somewhere else if data come from search tab then "fromSearch" will be true
// "mediaType" it tell whether it is "TV" or "Movie"
const MovieCard = ( { data, fromSearch, mediaType } ) => {

     // "url" it use to  get the url from the redux store
     const { url } = useSelector((state) => state.home);
     const navigate = useNavigate();
     const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

     return (

        <div
            className = "movieCard"
            onClick = { () =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
              }
        >
            <div className = "posterBlock" >
                <Img className = "posterImg" src = {posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating = {data.vote_average.toFixed(1)} />
                        <Genres data = {data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className = "textBlock">
                <span className = "title">{data.title || data.name}</span>
                <span className = "date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;