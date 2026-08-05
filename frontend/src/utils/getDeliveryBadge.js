export default function getDeliveryBadge(product, location){

    if(
        !location ||
        !product?.ubicacion
    ){
        return null;
    }

    const lat1 = location.lat;
    const lng1 = location.lng;

    const lat2 = product.ubicacion.lat;
    const lng2 = product.ubicacion.lng;

    if(!lat2 || !lng2){
        return null;
    }

    const R = 6371;

    const dLat = (lat2-lat1)*Math.PI/180;
    const dLng = (lng2-lng1)*Math.PI/180;

    const a =
        Math.sin(dLat/2)**2 +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLng/2)**2;

    const distancia =
        R * 2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1-a)
        );

    if(
        product?.ubicacion?.barrio &&
        location?.barrio &&
        product.ubicacion.barrio === location.barrio
    ){

        return {

            icon:"🏠",
            text:"En tu barrio",
            color:"green"

        };

    }

    if(distancia<1){

        return {

            icon:"📍",
            text:"Muy cerca",
            color:"green"

        };

    }

    if(distancia<3){

        return {

            icon:"⚡",
            text:"Llega hoy",
            color:"orange"

        };

    }

    if(distancia<8){

        return {

            icon:"🚚",
            text:"Entrega rápida",
            color:"blue"

        };

    }

    return {

        icon:"📦",
        text:"Disponible",

        color:"gray"

    };

}