import User from "../models/User.js";

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