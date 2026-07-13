import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import clientsController from "./controllers/clientsController.js";
import clientsRegister from "./controllers/clientsRegister.js";
import clientsLogin from "./controllers/clientsLogin.js";
import adminsController from "./controllers/adminsController.js";
import adminsRegister from "./controllers/adminsRegister.js";
import adminsLogin from "./controllers/adminsLogin.js";
import ticketsController from "./controllers/ticketsController.js";


const app = express ();

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],

    credentials: true,
}),
);

app.use(cookieParser());
app.use(express.json());

app.use("api/clients", clientsController);
app.use("api/registerClients", clientsRegister);
app.use("api/login",clientsLogin);
app.use("api/admins", adminsController)
app.use("api/registerAdmins", adminsRegister);
app.use("api/loginAdmins", adminsLogin);
app.use("api/tickets", ticketsController);



export default app;

