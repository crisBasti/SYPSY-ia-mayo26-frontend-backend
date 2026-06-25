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