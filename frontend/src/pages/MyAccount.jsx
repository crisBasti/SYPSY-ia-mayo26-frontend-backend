import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";

function MyAccount() {

    const [profile, setProfile] = useState({

        telefono: "",

        

        direccion:{

            provincia:"",
            ciudad:"",
            barrio:"",
            calle:"",
            numero:"",
            piso:"",
            departamento:"",
            codigoPostal:""

        },

        descripcion:"",

        whatsapp:"",

        instagram:"",

        facebook:"",

        sitioWeb:"",

        datosBancarios: {

          titular: "",

          banco: "",

          alias: "",

          cvu: "",

          cbu: ""

        }
 
    });

    const [guardando, setGuardando] = useState(false);

    useEffect(()=>{

        cargarPerfil();

    },[]);

    const cargarPerfil = async()=>{

        try{

            const token = await auth.currentUser.getIdToken();

            const {data}=await axios.get(

                `${import.meta.env.VITE_API_URL}/api/profile`,

                {

                    headers:{
                        Authorization:`Bearer ${token}`
                    }

                }

            );

            setProfile({

              telefono:data.telefono || "",

              descripcion:data.descripcion || "",

              whatsapp:data.whatsapp || "",

              instagram:data.instagram || "",

              facebook:data.facebook || "",

              sitioWeb:data.sitioWeb || "",

            direccion:{

              provincia:data.direccion?.provincia || "",

              ciudad:data.direccion?.ciudad || "",

              barrio:data.direccion?.barrio || "",

              calle:data.direccion?.calle || "",

              numero:data.direccion?.numero || "",

              piso:data.direccion?.piso || "",

              departamento:data.direccion?.departamento || "",

             codigoPostal:data.direccion?.codigoPostal || ""

            },

            datosBancarios:{

              titular: data.datosBancarios?.titular || "",

              alias: data.datosBancarios?.alias || "",

              cvu: data.datosBancarios?.cvu || "",

              banco: data.datosBancarios?.banco || ""

            }

          });

        }

        catch(error){

            console.error(error);

        }

    };

    const cambiarDireccion=(e)=>{

        setProfile({

            ...profile,

            direccion:{

                ...profile.direccion,

                [e.target.name]:e.target.value

            }

        });

    };

    const guardarPerfil = async () => {

    try {

        setGuardando(true);

        let ubicacion = profile.ubicacion || {};

        if (navigator.geolocation) {

            try {

                const posicion = await new Promise((resolve, reject) => {

                    navigator.geolocation.getCurrentPosition(

                        resolve,

                        reject,

                        {

                            enableHighAccuracy: true,

                            timeout: 10000

                        }

                    );

                });

                ubicacion = {

                    lat: posicion.coords.latitude,

                    lng: posicion.coords.longitude

                };

            } catch (error) {

                console.log("No se pudo obtener GPS", error);

            }

        }

        const token = await auth.currentUser.getIdToken();

        await axios.put(

            `${import.meta.env.VITE_API_URL}/api/profile`,

            {

                ...profile,

                ubicacion

            },

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        setProfile(prev => ({

            ...prev,

            ubicacion

        }));

        alert("Perfil actualizado.");

    }

    catch(error){

        console.error(error);

        alert("No se pudo guardar.");

    }

    finally{

        setGuardando(false);

    }

};

    return(

        <div className="dashboard">

            <h1>👤 Mi Cuenta</h1>

            <h2>🏪 Perfil del vendedor</h2>

<textarea
    placeholder="Contale a los compradores quién sos..."
    rows={4}
    value={profile.descripcion}
    onChange={(e)=>
        setProfile({
            ...profile,
            descripcion:e.target.value
        })
    }
/>

<input
    type="text"
    placeholder="WhatsApp"
    value={profile.whatsapp}
    onChange={(e)=>
        setProfile({
            ...profile,
            whatsapp:e.target.value
        })
    }
/>

<input
    type="text"
    placeholder="Instagram"
    value={profile.instagram}
    onChange={(e)=>
        setProfile({
            ...profile,
            instagram:e.target.value
        })
    }
/>

<input
    type="text"
    placeholder="Facebook"
    value={profile.facebook}
    onChange={(e)=>
        setProfile({
            ...profile,
            facebook:e.target.value
        })
    }
/>

<input
    type="text"
    placeholder="Sitio web"
    value={profile.sitioWeb}
    onChange={(e)=>
        setProfile({
            ...profile,
            sitioWeb:e.target.value
        })
    }
/>

            <h2>📍 Dirección de entrega</h2>

            <input
                name="provincia"
                placeholder="Provincia"
                value={profile.direccion.provincia}
                onChange={cambiarDireccion}
            />

            <input
                name="ciudad"
                placeholder="Ciudad"
                value={profile.direccion.ciudad}
                onChange={cambiarDireccion}
            />

            <input
                name="barrio"
                placeholder="Barrio"
                value={profile.direccion.barrio}
                onChange={cambiarDireccion}
            />

            <input
                name="calle"
                placeholder="Calle"
                value={profile.direccion.calle}
                onChange={cambiarDireccion}
            />

            <input
                name="numero"
                placeholder="Número"
                value={profile.direccion.numero}
                onChange={cambiarDireccion}
            />

            <input
                name="piso"
                placeholder="Piso"
                value={profile.direccion.piso}
                onChange={cambiarDireccion}
            />

            <input
                name="departamento"
                placeholder="Departamento"
                value={profile.direccion.departamento}
                onChange={cambiarDireccion}
            />

            <input
                name="codigoPostal"
                placeholder="Código Postal"
                value={profile.direccion.codigoPostal}
                onChange={cambiarDireccion}
            />

            <br/><br/>

            <div className="account-section">

    <h3>💳 Datos de Cobro</h3>

    <div className="form-group">
        <label>Titular</label>
        <input
            type="text"
            value={profile.datosBancarios?.titular || ""}
            onChange={(e) =>
                setProfile({
                    ...profile,
                    datosBancarios: {
                        ...profile.datosBancarios,
                        titular: e.target.value
                    }
                })
            }
        />
    </div>

    <div className="form-group">
        <label>Banco</label>
        <input
            type="text"
            value={profile.datosBancarios?.banco || ""}
            onChange={(e) =>
                setProfile({
                    ...profile,
                    datosBancarios: {
                        ...profile.datosBancarios,
                        banco: e.target.value
                    }
                })
            }
        />
    </div>

    <div className="form-group">
        <label>Alias</label>
        <input
            type="text"
            value={profile.datosBancarios?.alias || ""}
            onChange={(e) =>
                setProfile({
                    ...profile,
                    datosBancarios: {
                        ...profile.datosBancarios,
                        alias: e.target.value
                    }
                })
            }
        />
    </div>

    <div className="form-group">
        <label>CVU</label>
        <input
            type="text"
            value={profile.datosBancarios?.cvu || ""}
            onChange={(e) =>
                setProfile({
                    ...profile,
                    datosBancarios: {
                        ...profile.datosBancarios,
                        cvu: e.target.value
                    }
                })
            }
        />
    </div>

    <div className="form-group">
        <label>CBU</label>
        <input
            type="text"
            value={profile.datosBancarios?.cbu || ""}
            onChange={(e) =>
                setProfile({
                    ...profile,
                    datosBancarios: {
                        ...profile.datosBancarios,
                        cbu: e.target.value
                    }
                })
            }
        />
    </div>

</div>

            <button onClick={guardarPerfil}>

                Guardar perfil

            </button>

        </div>

    );

}

export default MyAccount;