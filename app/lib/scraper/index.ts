import axios from "axios";
import * as cheerio from 'cheerio';
import { extractCurrency, extractPrice } from "../utils";


export default async function scrapeAmazonProduct(url: string) {
    if(!url) return;

    // curl -i --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_a1482f41-zone-web_unlocker1:u94eedy7wi0m -k "https://geo.brdtest.com/welcome.txt"

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const sessionId = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${sessionId}`,
            password,
        },
        host: "brd.superproxy.io",
        port,
        rejectUnauthorized: false
    }

    try{
         const response = await axios.get(url, options)
         const $ = cheerio.load(response.data);
         const title = $("#productTitle").text().trim();
         const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a.button-selected .a-color-base')
         );

         const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen')
         )
         const currency = extractCurrency($('.a-price-symbol'));

         const imageOfItem = 
         $("#imgBlkFront").attr('data-a-dynamic-image') ||
         $("#landingImage").attr('data-a-dynamic-image') ||
         '{}'

         const imageUrls = Object.keys(JSON.parse(imageOfItem));

         const discountRate = $(".savingsPercentage").text().replace(/[-%]/, '');


         const notInStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
         console.log({title, currentPrice, originalPrice, notInStock, currency, imageUrls, discountRate})
    }catch(error:any){
        console.log(error.message)
        throw new Error(`${error.message}`)
        
        

    }

}