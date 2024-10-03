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

export async function getProductById(productId: string){
    try {
        connectToDB();
        const product = await Product.findOne({_id: productId})
        if(!product) return null;
        return product;
    } catch (error) { 
        console.log(error)
        
        
    }
}


export async function getAllProducts(){
    try {
        connectToDB();
        const products = await Product.find();

        return products;
        
    } catch (error) {
        console.log(error)
        
    }
}

export async function getSimilarProducts(productId: string){
    try {
        connectToDB();
        const currentProduct = await Product.findById(productId);
        if(!currentProduct) return null;

        const similar = await Product.find({
            _id: {$ne: productId}
        }).limit(3)

        return similar;
        
    } catch (error) {
        console.log(error)
        
    }
}
