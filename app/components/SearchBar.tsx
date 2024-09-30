"use client"

import React, { FormEvent, useState } from 'react'
import { scrapeAndScoreProduct } from '../lib/actions';


const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        if(hostname.includes('amazon.com') || 
              hostname.includes('amazon.') || 
              hostname.endsWith('amazon')){
                return true
              }

        
    } catch (error) {
      return false
        
    }
    return false
}

const SearchBar = () => {
    const [searchUrl, setSearchUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const handleSubmit = async  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const isValidLink = isValidAmazonProductURL(searchUrl);


        if(!isValidLink) return alert("Please enter a valid Amazon product link")

        try {
          setIsLoading(true);
          const product = await scrapeAndScoreProduct(searchUrl)
          


          
        } catch (error) {
          
        }finally {
          setIsLoading(false)
        }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12'
          onSubmit={handleSubmit}
    >
     <input type="text" 
     value={searchUrl}
     onChange={(e) => {setSearchUrl(e.target.value)}}
     placeholder='Enter product link'
     className='searchbar-input'
    
     
     />
     <button type='submit' className='searchbar-btn'>
      {isLoading ? "Searching...": "Snag"}
     </button>

    </form>
  )
}

export default SearchBar