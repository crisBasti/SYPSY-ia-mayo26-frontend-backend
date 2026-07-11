import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(

{

    title:{

        type:String,

        required:true

    },

    image:{

        type:String,

        required:true

    },

    link:{

        type:String,

        default:""

    },

    position:{

        type:String,

        enum:[

            "home_top",

            "home_middle",

            "category",

            "product"

        ],

        default:"home_top"

    },

    active:{

        type:Boolean,

        default:true

    },

    startDate:{

        type:Date

    },

    endDate:{

        type:Date

    },

    impressions:{

        type:Number,

        default:0

    },

    clicks:{

        type:Number,

        default:0

    }

},

{

    timestamps:true

}

);

export default mongoose.model(

    "Advertisement",

    advertisementSchema

);