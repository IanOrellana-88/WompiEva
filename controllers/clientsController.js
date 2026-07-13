import clientsModel from "../models/clients.js";

const clientsController = {};

//Select
clientsController.getClients = async (req, res) => {
    try {
        const clients = await clientsModel.find();
        return res.status(200).json(clients);
} catch (error){
    console.log("error"+error);
    return res.status(500).json({message: "Interal server error"})
}
};
//update
clientsController.updateClient = async (req, res) => {
  try {
    let {
        name, email, password, isVerified, timeOut
    } =req.body;
  
    name=name?.trim();
    email=email.trim();

    if (!name || !email || !password){
        return res.status (400).json({message: "Field required"});
    }

    const clientsUpdated = await clientsModel.findByIdAndUpdate(
        req.params.id,
        {name, email, password, timeOut, isVerified},
        {new: true},
    );

    if (!clientsUpdated){
        return res.status (404).json({message: "Clients Not Found"});
    }

    return res.status(200).json({message: "Client Updated"});
} catch (error){
    console.log("error"+error);
    return res.status(500).json({message: "Internal Server Error"})
}
};

//delete
clientsController.deleteClients = async (req, res) => {
    try {
        const deleteClients = clientsModel.findByIdAndDelete (req.params.id);

        if (!deleteClients) {
            return res.status(404).json({message: "Client not found"});
        }
        return res.status(200).json({message: "client deleted"});

    } catch (error){
        console.log("error"+ error);
        return res.status(500).json({message: "Internal server errror"});
    }
};

export default clientsController;