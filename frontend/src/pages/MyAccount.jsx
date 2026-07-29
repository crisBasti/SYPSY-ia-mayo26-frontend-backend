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

        }

    });

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

                direccion:{

                    provincia:data.direccion?.provincia || "",

                    ciudad:data.direccion?.ciudad || "",

                    barrio:data.direccion?.barrio || "",

                    calle:data.direccion?.calle || "",

                    numero:data.direccion?.numero || "",

                    piso:data.direccion?.piso || "",

                    departamento:data.direccion?.departamento || "",

                    codigoPostal:data.direccion?.codigoPostal || ""

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

    const guardarPerfil=async()=>{

        try{

            const token=await auth.currentUser.getIdToken();

            await axios.put(

                `${import.meta.env.VITE_API_URL}/api/profile`,

                profile,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            alert("Perfil actualizado.");

        }

        catch(error){

            console.error(error);

            alert("No se pudo guardar.");

        }

    };

    return(

        <div className="dashboard">

            <h1>👤 Mi Cuenta</h1>

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

            <button onClick={guardarPerfil}>

                Guardar dirección

            </button>

        </div>

    );

}

export default MyAccount;