import Report from "../models/Report.js";
import Product from "../models/Product.js";

export const getReports = async (req, res) => {

    try{

        const reports = await Report
        .find()
        .populate("productId")
        .sort({createdAt:-1});

        res.json(reports);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


export const updateReportStatus = async (req, res) => {

    try {

        const report = await Report.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status
            },

            {
                new: true
            }

        );

        res.json(report);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Aprobar reporte (marcar como revisado)

export const approveReport = async (req,res)=>{

    try{

        const report = await Report.findByIdAndUpdate(

            req.params.id,

            {
                status:"approved"
            },

            {
                new:true
            }

        );

        res.json(report);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Rechazar reporte

export const rejectReport = async(req,res)=>{

    try{

        const report = await Report.findByIdAndUpdate(

            req.params.id,

            {
                status:"rejected"
            },

            {
                new:true
            }

        );

        res.json(report);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Eliminar publicación reportada

export const deleteReportedProduct = async(req,res)=>{

    try{

        const report = await Report.findById(req.params.id);

        if(!report){

            return res.status(404).json({
                message:"Reporte no encontrado"
            });

        }

        await Product.findByIdAndDelete(
            report.productId
        );

        report.status="product_deleted";

        await report.save();

        res.json({

            success:true

        });

    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};