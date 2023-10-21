import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import {router} from "./src/routes/route.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api", router);


const port = process.env.PORT;
const database = process.env.DB_CONNECTION

app.listen(port,"192.168.96.33", async () => {
    console.log(`Express server started at Port - ${port}`);
    mongoose.set('strictQuery', false);
    mongoose.connect(database, { dbName: 'BaseLogin', useNewUrlParser: true })
        .then(result => {
            console.log('connected to DB!');
        }).catch(error => {
            console.log("Error in db connection", error);
        });
});