import React from 'react';

import slide1 from '../../assets/slide1.avif';
import slide2 from '../../assets/slide2.avif';
import slide3 from '../../assets/slide3.avif';
import Login from '../../components/custom/Landing/Login';
import useCarousel from '../../hooks/useCarousel';

function LandingPage(): React.ReactNode {
  const slideShow = [slide1, slide2, slide3];

  const currIdx = useCarousel(slideShow, 2000);

  return (
    <div className="flex flex-row justify-center items-center mx-auto border h-screen">
      <div
        className="flex-1 h-full transition-all duration-600 ease-in max-lg:opacity-80 opacity-85"
        style={{
          backgroundImage: `url(${slideShow[currIdx]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          objectFit: 'cover',
        }}
      ></div>
      <div className="flex-1 max-lg:absolute max-lg:bg-white max-lg:rounded-lg max-lg:z-10">
        <Login />
      </div>
    </div>
  );
}

export default LandingPage;
