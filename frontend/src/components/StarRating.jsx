function StarRating({

    value,

    onChange

}) {

    return (

        <div
            style={{
                display: "flex",
                gap: "8px",
                fontSize: "32px",
                cursor: "pointer",
                userSelect: "none"
            }}
        >

            {

                [1,2,3,4,5].map((star)=>(

                    <span

                        key={star}

                        onClick={()=>

                            onChange(star)

                        }

                    >

                        {

                            star <= value

                            ?

                            "⭐"

                            :

                            "☆"

                        }

                    </span>

                ))

            }

        </div>

    );

}

export default StarRating;