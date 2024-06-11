import axios from 'axios';
import * as cheerio from "cheerio";

const add = '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07';

//const add = '0xb5b011030eacc4f6994d35d84ff6cf936a7d4fdc17cfe9f0a554246bced32852';

async function fetch_tx(add){
    const url = 'https://app.fuel.network/account/'.concat(add).concat('/transactions');
    try {
        const response = await axios.get(url);
        const selector = cheerio.load(response.data);
        var fuel_q = selector(".rt-Text").text() || "";

        //console.log(fuel_q);
        var txd = fuel_q.split('days');
        var i = 0;
        var count = 0;
        while (i < txd.length - 1){
            var tx = txd[i];
            var temp = tx.split('ETH');
            if (Number(temp[1]) <= 15){
                count++;
            }
            i++;
        }
        var txh = fuel_q.split('hours');
        i = 0;
        while (i < txh.length - 1){
            var tx = txh[i];
            var temp = tx.split('ETH');
            count++;
            i++;
        }
        var txm = fuel_q.split('minutes');
        i = 0;
        while (i < txm.length - 1){
            var tx = txm[i];
            var temp = tx.split('ETH');
            count++;
            i++;
        }

        if (count <= 15){
            console.log(count.toString().concat(' transactions in the last 15 days'));
        }
        else {
            console.log('15 plus transactions in the last 15 days');
        }
    }
    catch (e){
        console.log('fetch error for transactions');
    }

    const url2 = 'https://app.fuel.network/account/'.concat(add).concat('/assets');
    try {
        const response2 = await axios.get(url2);
        const selector2 = cheerio.load(response2.data);
        var fuel_q2 = selector2(".rt-Text").text() || "";

        var temp1 = fuel_q2.split('Learn');
        var temp2 = temp1[0].split('Ecosystem');
        var asset_val = temp2[1];
        asset_val = asset_val.replace(/,/g, '');


        if (Number(asset_val) >= 1000){
            console.log('Address is eligible as active wallet');
        }
        else {
            console.log('Address is NOT eligible as active wallet');
        }

    }
    catch (err){
        console.log(err);
        console.log('fetch error for assets');
    }




}


await fetch_tx(add);
