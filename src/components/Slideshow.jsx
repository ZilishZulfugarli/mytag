import React, { useState, useEffect } from 'react';
import style from '../styles/slideshow.module.scss'; // Create a CSS module for the slideshow styling

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className={style.slideshowContainer}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${style.slide} ${index === currentIndex ? style.active : ''}`}
                >
                    {index === currentIndex && <img src={image.imageName} alt="" />}
                </div>
            ))}
            {images.length > 1 && (
                <>
                    <button onClick={prevSlide} className={style.prev}>❮</button>
                    <button onClick={nextSlide} className={style.next}>❯</button>
                </>
            )}
        </div>
    );
};

export default Slideshow;
