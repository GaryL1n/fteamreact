import React from 'react';
import './Home.css';
import HomeSwiper from './HomeSwiper';

const Home = () => {
  return (
    <>
      <div className="home-bg w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-10 pb-5 pe-5 text-danger">
          <HomeSwiper />
        </div>
      </div>
    </>
  );
};

export default Home;
