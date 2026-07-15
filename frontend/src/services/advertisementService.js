export const getAdvertisementsService = async () => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements`

    );

    return await response.json();

};


export const createAdvertisementService = async (

    data,

    token

) => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify(data)

        }

    );

    return await response.json();

};


export const updateAdvertisementService = async (

    id,

    data,

    token

)=>{

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements/${id}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify(data)

        }

    );

    return await response.json();

};


export const deleteAdvertisementService = async (

    id,

    token

)=>{

    await fetch(

        `${import.meta.env.VITE_API_URL}/api/advertisements/${id}`,

        {

            method:"DELETE",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

};