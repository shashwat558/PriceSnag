"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';


const images = [
   { imgUrl: '/assets/images/hero-1.svg', alt: 'smartWatch'},
   { imgUrl: '/assets/images/hero-2.svg', alt: 'smartWatch'},
   { imgUrl: '/assets/images/hero-3.svg', alt: 'smartWatch'},
   { imgUrl: '/assets/images/hero-4.svg', alt: 'smartWatch'},
   { imgUrl: '/assets/images/hero-5.svg', alt: 'smartWatch'},




]

const HeroCarousel = () => {
  return (
    <div className='hero-carousel'>
        <Carousel
       showThumbs={false}
    //    autoPlay
       showArrows={false}
       showStatus={false}
       infiniteLoop     
    
    >
      {images.map((image) => (
        <Image key={image.alt} src={image.imgUrl} alt={image.alt} width={300} height={300}/>
      ))}
       </Carousel>
       <Image  
       className='max-xl:hidden absolute -left-[15%] bottom-0'

       src={"/assets/icons/hand-drawn-arrow.svg"} alt='hand-drawn-arrow' width={175} height={175}/>
    </div>
  )
}

export default HeroCarousel