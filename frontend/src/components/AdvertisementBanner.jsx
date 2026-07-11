import { useEffect, useState } from "react";

import {

getAdvertisementsService,

registerAdImpressionService,

registerAdClickService

}

from "../services/productService";

function AdvertisementBanner({

position

}){

const [ad,setAd]=useState(null);

useEffect(()=>{

loadBanner();

},[position]);

const loadBanner=async()=>{

const ads=

await getAdvertisementsService();

const activeAd=

ads.find(

ad=>

ad.position===position

&&

ad.active

);

setAd(activeAd || null);


if(activeAd){

    registerAdImpressionService(
        activeAd._id
    );

}

};

if(!ad){

return null;

}

return(

<a

href={ad.link}

target="_blank"

rel="noopener noreferrer"

onClick={()=>{

    registerAdClickService(
        ad._id
    );

}}

>

<img

src={ad.image}

alt={ad.title}

className="advertisement-banner"

/>

</a>

);

}

export default AdvertisementBanner;