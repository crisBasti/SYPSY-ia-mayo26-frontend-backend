import { useEffect, useState } from "react";

import { getAdvertisementsService }

from "../services/productService";

function AdvertisementCarousel({

    position

}) {

    const [ads, setAds] = useState([]);

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        loadAds();

    }, [position]);

    useEffect(() => {

        if (ads.length <= 1) return;

        const interval = setInterval(() => {

            setCurrent(prev =>

                (prev + 1) % ads.length

            );

        }, 5000);

        return () => clearInterval(interval);

    }, [ads]);

    const loadAds = async () => {

        try {

            const data =

                await getAdvertisementsService();

            const banners =

                data.filter(ad =>

                    ad.position === position &&

                    ad.active

                );

            setAds(banners);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!ads.length) {

        return (

            <div className="default-banner">

                <h2>

                    SYPSY

                </h2>

                <p>

                    LO QUE QUERÉS YA

                </p>

            </div>

        );

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