import { useEffect, useState } from "react";



function AdvertisementCarousel({

    position,

    advertisements = []

}) {

    const ads = advertisements.filter(

    ad =>

        ad.position === position &&

        ad.active

);

    const [current, setCurrent] = useState(0);



    useEffect(() => {

        if (ads.length <= 1) return;

        const interval = setInterval(() => {

            setCurrent(prev =>

                (prev + 1) % ads.length

            );

        }, 5000);

        return () => clearInterval(interval);

    }, [ads]);



    if (ads.length === 0) {
    return null;
}

    return (

        <div className="advertisement-carousel">

            <a

                href={ads[current].link}

                target="_blank"

                rel="noopener noreferrer"

            >

                <img

                    src={ads[current].image}

                    alt={ads[current].title}

                />

            </a>

            {

                ads.length > 1 &&

                <div className="carousel-dots">

                    {

                        ads.map((_, index) => (

                            <span

                                key={index}

                                className={

                                    current === index

                                        ? "dot active"

                                        : "dot"

                                }

                            />

                        ))

                    }

                </div>

            }

        </div>

    );

}

export default AdvertisementCarousel;