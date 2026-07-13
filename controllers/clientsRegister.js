import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs"

import clientsModel from "../models/clients.js"

import {config} from "../../config.js";

const clientsRegister = {}

clientsRegister.register = async (req, res) => {
    const {name, email, password, isVerified}
    =req.body;

    try { 
        const existClient = await clientsModel.findOne({email});
        if (existsClient)
            return res.status(400).jsn({message: "Cliente exists"});
    

    const passwordHashed = await bcryptjs.hash(password, 10);
    const randomNumber = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign({randomNumber, name, email, password: passwordHashed, isVerified},
        config.JWT.secret, {
            expiresIn: "15minutos"
        }
    );

    res.cookie ("registrationCookie", token, {maxAge: 15*60*1000});

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:config.email.user_email,
            password:config.email.user_password,
        },
    });

    const mailOptions = {
        from: config.email.user_email,
        to: email,
        subject: "Verificacion de cuenta",
        text: "Para verificar tu cuenta usa tu codigo" + randomNumer + "expira en 15 minutos"
    };

    transporter.sendMail (mailOptions, (error, info) => {
        if (error) {
            console.log("error"+ error);
            return res.status(500).json({message:"error"})
        }
        return res.status(200).json({message: "Codigo enviado"});
    });
} catch (error) {
    console.log("error"+error);
    return res.status(500).json({message: "Internal Server Error"});
}
};

clientsRegister.verifyCode = async (req,res) => {
    try {
        const {verificationCodeRequest} =req.body;

        const token = req.cookie.registrationCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomNumber: storedCode, name, email, password, isVerified,} =decoded;
            if (verificationCodeRequest !== storedCode){
                return res.status (400).json ({message: "Invalid Code"});
            }
            const newClient = new clientsModel ({
                name, email, password, isVerified: true,
            });
            await newClient.save();

            res.clearCookie("registrationCookie")
            return res.status(200).json({message: "Cliente registrado"})
        } catch (error){
            console.log("error"+error)
            return res.status(500).json({message: "Interanl server error"})
        }
    };
export default clientsRegister;