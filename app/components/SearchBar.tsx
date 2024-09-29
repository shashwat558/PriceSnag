"use client"

import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        if(hostname.includes('amazon.com') || 
              hostname.includes('amazon.') || 
              hostname.endsWith('amazon'))

        
    } catch (error) {
        
    }
}

const SearchBar = () => {
    const [searchUrl, setSearchUrl] = useState("");



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const isValidLink = isValidAmazonProductURL(searchUrl);

        alert(isValidLink ? "Valid Link")
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
     <button type='submit' className='searchbar-btn'>Snag</button>

    </form>
  )
}

export default SearchBar