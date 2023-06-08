const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const upload = require("../utils/upload");
const { pet } = require("../models/pet");

/**
 * @description API to register users to database
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const registerUser = async (req, res) => {
  try {
    let newPassword = await bcrypt.hash(req.body.password, 10);

    const savedUser = await Patient.create({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: newPassword,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });

    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email.toLowerCase(),
      },
      process.env.JWT_SECRET
    );


    return res.status(200).json({
      message: "User Registered Succesfully",
      data: {
        token,
        savedUser
      },
    }); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * @description API to login Users
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const loginUser = async (req, res) => {
  const email = req.body.email;
  let user = await User.findOne({ email: email.toLowerCase() });
  if (user) {
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isValidPassword) {
      const token = jwt.sign(
        {
          name: req.body.name,
          email: req.body.email,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        token,
        id: user._id,
        name: user.name,
        email: user.email,
        message: "User Succesfully Logged In",
      });
    } else {
      return res.status(401).json({
        message: "Incorrect Password!",
      });
    }
  } else {
    return res.status(500).json({
      message: "User doesn't exist, please register",
    });
  }
};

/**
 * @description API to fetch all users from database
 * @param {*} req
 * @param {*} res
 */
const getAllUsers = (req, res) => {
  User.find()
    .populate({
      path: "address",
    })
    .then((result) => {
      return res.status(200).json({
        message: "Succesfully fetched All Users",
        data: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};



/**
 * @description API to add a pet, update a user by id
 * @param {*} req
 * @param {*} res
 */
 const addPetForUser = async (req, res) => {
  const id = req.params.id;

  // const uploadProfilePicture = await upload(
  //   `${Date.now() + "" + req.body.name}`,
  //   req.body.profilePicture,
  //   "jpg",
  //   "user",
  //   req.body.name
  // );

  const petData = await pet.create({
    profilePicture: '',
    name: req.body.name,
    animal_type: req.body.animal_type,
    breed: req.body.breed,
    description: req.body.description,
    age: req.body.age,
    createdBy: req.body.createdBy
  })

  console.log(id)
  User.findOneAndUpdate({ _id: id }, {
    petData
  }, {
    returnOriginal: false,
  }).then((result) => {
    res.status(200).json({
      message: "Succesfully Added the pet",
      data: result,
    });
  });
};


/**
 * @description API to fetch all pets of a User
 * @param {*} req
 * @param {*} res
 */
 const getPets = (req, res) => {
  pet.find({ createdBy: req.params.id })
  .then((result) => {
      return res.status(200).json({
          message: "Succesfully fetched all pets of the given user",
          data: result,
      });
  })
  .catch((error) => {
      return res.status(404).json({
          message: error.message,
      });
  });
};

/**
 * @description API to update a patient by id
 * @param {*} req
 * @param {*} res
 */
const updatePatient = async (req, res) => {
  const id = req.params.id;

    let uploadProfilePicture;

    if (req.body.profilePicture) {
      uploadProfilePicture = await upload(
        `${Date.now() + "" + req.body.name}`,
        req.body.profilePicture,
        "jpg",
        "patient",
        req.body.name
      );
    }

  Patient.findOneAndUpdate({ _id: id }, {...req.body, profilePicture: uploadProfilePicture }, {
    returnOriginal: false,
  }).then((result) => {
    res.status(200).json({
      message: "Succesfully updated the Patient",
      data: result,
    });
  });
};

/**
 * @description API to delete user
 * @param {*} req
 * @param {*} res
 */
const deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) => {
      return res.status(200).json({
        message: "Patient succesfully delete",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

/**
 * @description Api to fetch user based on given ID
 * @param {*} req
 * @param {*} res
 */
const getUserById = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((result) => {
      return res.status(200).json({
        message: `User found succesfully`,
        data: result,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        message: error.message,
      });
    });
};



module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getPets,
  deleteUser,
  getUserById,
  addFamilyForPatient,
  getMembers,
};
