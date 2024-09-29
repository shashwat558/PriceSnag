import axios from "axios";
import * as cheerio from 'cheerio';


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
         console.log(response.data)
    }catch(error){

    }

}