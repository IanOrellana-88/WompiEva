import ticketsModel from "../models/tickets.js";
import clientsModel from "../models/clients.js";

const ticketsController = {};

ticketsController.getTickets = async (req, res) => {
    try{
        const tickets = await ticketsModel
        .find()
        .populate("customerId", "name email")
        .populate("clients, clientId", "name price");

        return res.status(200).json(tickets);
    } catch (error){
        console.log("error"+error);
        return res.status(500).json({message: "Internal server error"});
    }
        

    ticketsController.createTicket = async (req, res) => { 
        try {
            const ticket = await ticketsModel 
            .findById(req.params.id)
            .populate("customerId", "name email")
            .populate("clientId", "name price");
if (!ticket) {
    return res.status(404).json({message: "Ticket not found"});
}

return res.status(200).json(ticket);
        } catch (error){
            console.log("error"+error);
            return res.status(500).json({message: "Internal server error"});
        } 
    };

    ticketsController.insertTicket = async (req, res) => {
        try {
            const {customerId, clientId, purchaseDate, price} = req.body;

            let total = 0;

            let newClient = await clientsModel.findById(clientId);

            for (let i = 0; i < newClient.length; i++) {
                const subtotal = newClient[i].price * newClient[i].quantity;

                total =  subtotal;
                newTicket.push({
                    customerId,
                    clientId: newClient[i]._id,
                    purchaseDate,
                    price: subtotal,
                });
            }