import React from 'react';
import HeroBanner from './heroBanner/HeroBanner.js';
import Trending from './trending/Trending.jsx';
import Popular from './popular/Popular.jsx';
import TopRated from './topRated/TopRated.jsx';
import './style.scss';
const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner/>
      <Trending/>
      <Popular />
      <TopRated />
      
    </div>
  )
}

export default Home
