"use server"

import { connectToDB } from "../mongoose";
import scrapeAmazonProduct from "../scraper";




export async function scrapeAndScoreProduct(productUrl: string) {
    if(!productUrl) return ;

    try {

        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        if(!scrapedProduct) return;
        
        
    } catch (error:any) {
        console.log(error.message)
        throw new Error(`Failed to create/update product: ${error.message}`)
        
    }


}