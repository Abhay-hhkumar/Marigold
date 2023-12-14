import { useState,useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {fetchDataFromApi} from "./utils/api";
import { useSelector, useDispatch } from 'react-redux';

import { getApiConfigration,getGenres } from './store/homeSlice';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import Home from './pages/home/Home';

import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import './index.scss';

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state)=>
     state.home
     );
  // console.log(url)

  useEffect( ()=>{

    fetchApiConfig();
    genresCall();
  },[]);

   const fetchApiConfig = () => {

   // Request URL: https://api.themoviedb.org/3/movie/popular
   // "/movie/popular" this is end point

   fetchDataFromApi('/configuration').then((res)=>{
    console.log(res);

    // we can't use images directly we need 'profile', 'poster', 'backdrop' from api because this rule is given in IMDB;
    // refresh the page and go to inspect then 'network' then see 'configuration'
    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
      
    }

        dispatch(getApiConfigration(url))
   });
}

     const genresCall = async() =>{
  let promises = []
  let endPoints =["tv", "movie"]
  let allGenres ={};

  endPoints.forEach((url)=>{
    promises.push(fetchDataFromApi(`/genre/${url}/list`))
  })
  const data = await Promise.all(promises);
  data.map(( {genres })=>{
    return genres.map((item)=> ( allGenres[item.id]= item))
  })
dispatch(getGenres(allGenres))


     }

  return (

    <BrowserRouter>

       <Header />
        <Routes>
          <Route path = "/"                   element = {<Home         />} />
          <Route path = "/:mediaType/:id"     element = {<Details      />} />
          <Route path = "/search/:query"      element = {<SearchResult />} />
          <Route path = "/explore/:mediaType" element = {<Explore      />} />
          <Route path = "*"                   element = {<PageNotFound />} />
        </Routes>
       <Footer />

    </BrowserRouter>
  );
}

export default App;

// to get API
// 1) go to tmbd on chrome then create account then verify the account
// 2) go to profie
// 3) go to setting
// 4) go to api
// 5) click here to get API key
// 6) api key = 243b5cc67a16c7d2177b92efde3920d6
// 7) token = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDNiNWNjNjdhMTZjN2QyMTc3YjkyZWZkZTM5MjBkNiIsInN1YiI6IjY1NzQ4ZDRjYTg0YTQ3MDBmZTBkZmVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GbeUNA3HGIaH642VIGFY5H8Tykw3aOZGHa61noYsZB4
// 8) (optional) create a .env file in your outside folder (i.e in MOVIE folder)
// 9) (optional) open .env file white TOKEN in capital letter and assign the url of token
// 10) to get url go to documentation( developer.themoviedb.org.)  of TMBD website where you have logged in 
// 11) then go to Application you will get the required url route path (// Request URL: https://api.themoviedb.org/3/movie/popular)




// packages
// 1) npm i sass
// 2) npm i axios
// 3) npm i @reduxjs/toolkit
// 4) npm i react-redux
// 5) npm i react-router-dom
// 6) npm i react-lazy-load-image-component
// 7) npm i react-icons
// 8) npm i dayjs (it use to change the date format)
// 9) npm i react-circular-progressbar (it use to show rating progressbar according to rating value)
// 10) npm i react-player (it use to play youtube video)
// 11) npm i react-infinite-scroll-component
// 12) npm i react-select


// hooks
// 1) useSelector, useState, useEffect, useNavigate....


