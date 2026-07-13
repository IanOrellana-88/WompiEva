import ticketsModel from "../models/tickets.js";

const ticketsControllers = {};

//Select
ticketsControllers.getTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.find();
        return res.status(200).json(clients);
} catch (error){
    console.log("error"+error);
    return res.status(500).json({message: "Interal server error"})
}
};
//update
ticketsControllers.updateTicket = async (req, res) => {
  try {
    let {
        customerId, quantity, pursacheDate, isVerified, timeOut
    } =req.body;
  
    name=name?.trim();
    email=email.trim();

    if (!customerId || !quantity || !pursacheDate){
        return res.status (400).json({message: "Field required"});
    }

    const ticketsUpdated = await ticketsModel.findByIdAndUpdate(
        req.params.id,
        {customerId, quantity, pursacheDate, isVerified, timeOut},
        {new: true},
    );

    if (!ticketsUpdated){
        return res.status (404).json({message: "Tickets Not Found"});
    }

    return res.status(200).json({message: "Ticket Updated"});
} catch (error){
    console.log("error"+error);
    return res.status(500).json({message: "Internal Server Error"})
}
};

//delete
ticketsControllers.deleteTickets = async (req, res) => {
    try {
        const deleteTickets = ticketsModel.findByIdAndDelete (req.params.id);

        if (!deleteTickets) {
            return res.status(404).json({message: "Ticket not found"});
        }
        return res.status(200).json({message: "Ticket deleted"});

    } catch (error){
        console.log("error"+ error);
        return res.status(500).json({message: "Internal server errror"});
    }
};

export default ticketsControllers;