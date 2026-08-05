import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {

    const [location, setLocation] = useState(null);

    useEffect(() => {

        const guardada = localStorage.getItem("sypsy-location");

        if (guardada) {

            setLocation(JSON.parse(guardada));

            return;

        }

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const ubicacion = {

                    lat: position.coords.latitude,

                    lng: position.coords.longitude

                };

                localStorage.setItem(

                    "sypsy-location",

                    JSON.stringify(ubicacion)

                );

                setLocation(ubicacion);

            },

            () => {

                console.log("El usuario no permitió ubicación.");

            }

        );

    }, []);

    return (

        <LocationContext.Provider

            value={location}

        >

            {children}

        </LocationContext.Provider>

    );

}

export const useLocation = () => useContext(LocationContext);