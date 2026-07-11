import { useEffect, useState } from "react";
import { auth } from "../firebase";

import {

getAdvertisementsService,
createAdvertisementService,
deleteAdvertisementService,
updateAdvertisementService

}

from "../services/productService";

function AdminAdvertisements(){

const [ads,setAds]=useState([]);const [form,setForm]=useState({

title:"",

image:"",

link:"",

position:"home_top",

active:true

});

useEffect(()=>{

loadAds();

},[]);

const loadAds=async()=>{

const data=

await getAdvertisementsService();

setAds(data);

};

const createAd=async()=>{

const token=

await auth.currentUser.getIdToken();

await createAdvertisementService(

form,

token

);

setForm({

title:"",

image:"",

link:"",

position:"home_top",

active:true

});

loadAds();

};



const deleteAd = async(id)=>{

const token=
await auth.currentUser.getIdToken();

await deleteAdvertisementService(
id,
token
);

loadAds();

};

const toggleActive = async(ad)=>{

const token=
await auth.currentUser.getIdToken();

await updateAdvertisementService(

ad._id,

{

active:!ad.active

},

token

);

loadAds();

};



return(

<div className="dashboard">

<h1>

📢 Publicidad

</h1>

<div className="product-form">

<input

placeholder="Título"

value={form.title}

onChange={(e)=>

setForm({

...form,

title:e.target.value

})

}

/>

<input

placeholder="URL Imagen"

value={form.image}

onChange={(e)=>

setForm({

...form,

image:e.target.value

})

}

/>

<input

placeholder="Link"

value={form.link}

onChange={(e)=>

setForm({

...form,

link:e.target.value

})

}

/>

<select

value={form.position}

onChange={(e)=>

setForm({

...form,

position:e.target.value

})

}

>

<option value="home_top">

Home Superior

</option>

<option value="home_middle">

Home Medio

</option>

<option value="category">

Categoría

</option>

<option value="product">

Producto

</option>

</select>

<button

onClick={createAd}

>

➕ Crear campaña

</button>

</div>

<table className="products-table">

<thead>

<tr>

<th>

Título

</th>

<th>

Posición

</th>

<th>

Estado

</th>

<th>

Impresiones

</th>

<th>

Clicks

</th>

<th>

Acciones

</th>

</tr>

</thead>

<tbody>

{

ads.map(ad=>(

<tr key={ad._id}>

<td>

{ad.title}

</td>

<td>

{ad.position}

</td>

<td>

{

ad.active

?

"🟢 Activa"

:

"🔴 Inactiva"

}

</td>

<td>

{ad.impressions}

</td>

<td>

{ad.clicks}

</td>

<td>

<button

onClick={()=>toggleActive(ad)}

>

{

ad.active

?

"⏸ Desactivar"

:

"▶ Activar"

}

</button>

<button

onClick={()=>deleteAd(ad._id)}

>

🗑 Eliminar

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}

export default AdminAdvertisements;