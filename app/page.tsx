import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>

     <section className='px-6 md:px-20 py-24 border-2 border-red-400'>
       <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='small-text'>
            To make your Shopping Easy:
            <Image  src="/assets/icons/arrow-right.svg" alt='arrow' height={16} width={16}/>
          </p>

          <h1 className='head-text'>Unleash the power of
            <span className='text-primary'> PriceSnag</span>
          </h1>
          <p className='mt-6'>Comprehensive, self-serve analytics platform designed to drive conversions, boost engagement, and enhance customer retention.

          </p>
          SearchBar
        </div>
          HeroCarousel
       </div>
     </section>
    <section  className='trending-section'>
        <h2 className='section-text'>Trending</h2>

        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {['Apple Iphone', 'Book', "Laptop"].map((product) => (
            <div>{product}</div>
          ))}
        </div>
            
     </section>
    </>
  )
}

export default page