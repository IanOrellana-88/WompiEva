 import clientsModel from "../models/clients.js"

 import bcrypt from "bcryptjs";
 import { config } from "../config.js";
import { JsonWebTokenError } from "jsonwebtoken";

 const clientsLogin = {};

 clientsLogin.login = async (req, res) => {
    const {email, password} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test (email)){
        return res.status(400).json({message: "correo invalido"});
    }
    try {
        const clientsFound = await clientsModel.findOne({email});

        if (!clientsFound){
            return res.status(400).json({message:"Client not found"});
        }
    if (clientsFound.timeOut && clientsFound.timeOut > Date.now())
    {return res.status(403).json ({message: "Cuenta bloqueada"});
}
const isMatch = await bcrypt.compare (password.clientsFound.password);

if (!isMatch) {clientsFound.loginAttempts = (clientsFound.loginAttempts || 0) +  1;

    if (clientsFound.loginAttempts >= 5){
        clientsFound.timeOut = Date.now () + 5 * 60 * 1000;
        clientsFound.loginAttempts = 0;

        await clientsFound.save();

        return res
        .status (403)
        .json({message: "Cuenta bloq por fallos"});
    }
    await clientsFound.save();

    return res.status(401).json({message: "Contra incorrecta"})
}

clientsFound.loginAttempts = 0;
clientsFound.timeOut = null;

const token = JsonWebToken.sign (
    {id: clientsFound._id, userType: "Client"},
    config.JWT.secrete,
    {expiresIn: "30d"},
);

res.cookie("authCookie", token);

return res.status(200).json({message: "Login correcto"});
} catch (error){
    console.log("error" + error);
    return res.status(500).json({message: "Internal server error"})
}
 };

 export default clientsLogin;