import adminsModel from "../models/admins.js";

const adminsController = {};

//Select
adminsController.getAdmins = async (req, res) => {
    try {
        const admins = await adminsModel.find();
        return res.status(200).json(admins);
} catch (error){
    console.log("error"+error);
    return res.status(500).json({message: "Interal server error"})
}
};
//update
adminsController.updateAdmin = async (req, res) => {
  try {
    let {
        name, email, password, isVerified, timeOut
    } =req.body;
  
    name=name?.trim();
    email=email.trim();

    if (!name || !email || !password){
        return res.status (400).json({message: "Field required"});
    }

    const adminsUpdated = await adminsModel.findByIdAndUpdate(
        req.params.id,
        {name, email, password, timeOut, isVerified},
        {new: true},
    );

    if (!adminsUpdated){
        return res.status (404).json({message: "admin Not Found"});
    }

    return res.status(200).json({message: "admin Updated"});
} catch (error){
    console.log("error"+error);
    return res.status(500).json({message: "Internal Server Error"})
}
};

//delete
adminsController.deleteAdmins = async (req, res) => {
    try {
        const deleteAdmins = adminsModel.findByIdAndDelete (req.params.id);

        if (!deleteAdmins) {
            return res.status(404).json({message: "ADMIN not found"});
        }
        return res.status(200).json({message: "Admin deleted"});

    } catch (error){
        console.log("error"+ error);
        return res.status(500).json({message: "Internal server errror"});
    }
};

export default adminsController;