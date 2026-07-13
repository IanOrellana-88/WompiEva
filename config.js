import dotenv from "dotenv";

dotenv.config();

export const config = {
    db:{
        URI:process.env.DB_URL,
    },
    JWT: {secrete:process.env.JWT_secret_key,
    },
    email:{
        user_email:process.env.USER_EMAIL,
        user_password:process.env.USER_PASSWORD,
    },
   wompi:{
        grant_type:process.env.GRANT_TYPE,
        audience:process.env.AUDIENCE,
        client_id:process.env.CLIENTE_ID,
        client_secret:process.env.CLIENTE_SECRET,
    }
}