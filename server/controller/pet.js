const { Pet } = require("../models/pet");
const { User } = require("../models/user");

const upload = require("../utils/upload");

/**
 * @description API to add pet to database
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const addPet = async (req, res) => {
    try {
        const data = req.body;
  
  
        const petData = await Pet.create({
            name: data.name,
            animal_type: data.animal_type,
            breed: data.breed,
            description: data.description,
            age: data.age,
            profilePicture: ''

        });

        console.log(petData);
    
        return res.status(201).json({
            message: "Pet created succesfully",
            data: petData,
        });
    } 

    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message,
        });

    }
};


/**
 * @description API to update a pet in database
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const updatePet = (req, res) => {
    const id = req.params.id;

    Pet.findOneAndUpdate({ _id: id }, req.body, {
        returnOrignal: false,
        }).then((result) => {
            res.status(200).json({
            message: "Succesfully updated the pet",
            data: result,
        });
    });
};



/**
 * @description API to get all pets from all the owners from the database
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const getAllPets = (req, res) => {
    const id = req.params.id;

    Pet.find()
    // .populate({
    //   path: "user",
    // })
    .then((result) => {
        return res.status(200).json({
            message: `All pets found succesfully`,
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
 * @description API to get a pet by id
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const getPetById = (req, res) => {
    const id = req.params.id;

    Pet.findById(id)
    .then((result) => {
        return res.status(200).json({
            message: `Pet with specific id found succesfully`,
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
 * @description API to get all pets of a user
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const getPetsByUser = (req, res) => {
    Pet.find({ createdBy: req.params.id }).populate({
      path: "user"
    })
    .then((result) => {
        return res.status(200).json({
            message: "Succesfully fetched all pets of given user",
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
 * @description API to delete a pet by id
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const deletePet = (req, res) => {
    const id = req.params.id;
    Pet.findByIdAndDelete(id)
    .then((result) => {
        return res.status(200).json({
            message: "Pet succesfully deleted",
        });
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
        });
    });
};

module.exports = {
  addPet,
  updatePet,
  deletePet,
  getPetsByUser,
  getPetById,
  getAllPets,
};
