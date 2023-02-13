import React, { useState, useEffect } from 'react';
import classes from './Carousel.module.css';

const Carousel = ({ images }) => {
  const [currImg, setCurrImg] = useState(0);

  const changeDotColor = (index) => {
    const dots = document.getElementsByClassName('dot');

    for (let i = 0; i < dots.length; i++) {
      if (Number(dots[i].id) === index) {
        dots[i].style.color = 'red';
      } else {
        dots[i].style.color = 'black';
      }
    }
  };

  useEffect(() => {
    changeDotColor(0);
  }, []);

  const rightClick = () => {
    const isLastImage = currImg === images.length - 1;
    const newIndex = isLastImage ? 0 : currImg + 1;
    setCurrImg(newIndex);
    changeDotColor(newIndex);
  };

  const leftClick = () => {
    const isFirstImage = currImg === 0;
    const newIndex = isFirstImage ? images.length - 1 : currImg - 1;
    setCurrImg(newIndex);
    changeDotColor(newIndex);
  };

  const goToSlide = (e, index) => {
    setCurrImg(index);
    changeDotColor(index);
  };

  return (
    <>
      <div className={classes.Carousel}>
        <div
          className={classes.carouselInner}
          style={{ backgroundImage: `url(${images[currImg]})` }}
        >
          <div className={classes.left} onClick={leftClick}>
            <i className='fa-sharp fa-solid fa-arrow-left'></i>
          </div>
          <div className={classes.center}></div>
          <div className={classes.right} onClick={rightClick}>
            <i className='fa-sharp fa-solid fa-arrow-right'></i>
          </div>
        </div>
      </div>
      <div className={classes.dots}>
        {images.map((image, i) => {
          return (
            <div
              key={i}
              id={i}
              className={`${classes.dot} dot`}
              style={{ cursor: 'pointer' }}
              onClick={(e) => goToSlide(e, i)}
            >
              ●
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
