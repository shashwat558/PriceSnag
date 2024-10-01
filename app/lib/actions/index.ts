"use server"
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import scrapeAmazonProduct from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";




export async function scrapeAndScoreProduct(productUrl: string) {
    if(!productUrl) return ;

    try {

        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        if(!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({url: scrapedProduct.url});
        if(existingProduct){
            const updatedPriceHistory = [
                ...existingProduct.priceHistory,
                {price: scrapedProduct.currentPrice}
            ],
            product = {
                ...scrapedProduct, 
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory)
            }
        }

        const newProduct = await Product.findOneAndUpdate({url: scrapedProduct.url}, product, {upsert:true, new:true});

        revalidatePath(`/product/${newProduct._id}`);
        
        
    } catch (error:any) {
        console.log(error.message)
        throw new Error(`Failed to create/update product: ${error.message}`)
        
    }


}