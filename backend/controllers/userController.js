import User from "../models/User.js";
import Reward from "../models/Reward.js";

export const createUser = async (
  req,
  res
) => {
  try {
    const {
      uid,
      nombre,
      apellido,
      email,
      telefono,
    } = req.body;

    const existingUser =
      await User.findOne({ uid });

    if (existingUser) {
      return res.status(200).json(
        existingUser
      );
    }

    const user = new User({
      uid,
      nombre,
      apellido,
      email,
      telefono,
    });

    await user.save();

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getUserByUid = async (
  req,
  res
) => {
  try {

    const { uid } = req.params;

    const user =
      await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({
        message:
          "Usuario no encontrado",
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getAllUsers = async (req, res) => {

  try {

    const users = await User.find().sort({
      createdAt: -1
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const getUsers = async (req, res) => {

    try {

        const users = await User
            .find()
            .sort({ createdAt: -1 })
            .lean();


        // ==========================================
        // OBTENER SALDOS RSPY
        // ==========================================

        const uids = users
            .map(user => user.uid)
            .filter(Boolean);


        const rewards = await Reward.find({

            uid: {
                $in: uids
            }

        })
        .select("uid saldo")
        .lean();


        // ==========================================
        // MAPA DE SALDOS RSPY
        // ==========================================

        const rewardsMap = new Map(

            rewards.map(reward => [

                reward.uid,

                reward.saldo || 0

            ])

        );


        // ==========================================
        // UNIR USUARIO + RSPY
        // ==========================================

        const usersWithRewards = users.map(user => ({

            ...user,

            rspy: rewardsMap.get(user.uid) || 0

        }));


        res.json(usersWithRewards);


    } catch (error) {

        console.error(
            "Error obteniendo usuarios:",
            error
        );


        res.status(500).json({

            message: error.message

        });

    }

};

export const updateUserStatus = async (req,res)=>{

  try{

    const user = await User.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new:true
      }

    );


    if(!user){

      return res.status(404).json({

        message:"Usuario no encontrado"

      });

    }


    res.json(user);


  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};

export const getCurrentUser = async (req, res) => {

    try {

        const user = await User.findOne({

            uid: req.user.uid

        });

        if (!user) {

            return res.status(404).json({

                message: "Usuario no encontrado"

            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};