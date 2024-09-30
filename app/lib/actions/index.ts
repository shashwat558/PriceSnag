"use server"

import scrapeAmazonProduct from "../scraper";




export async function scrapeAndScoreProduct(productUrl: string) {
    if(!productUrl) return ;

    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        
    } catch (error:any) {
        console.log(error.message)
        throw new Error(`Failed to create/update product: ${error.message}`)
        
    }
}