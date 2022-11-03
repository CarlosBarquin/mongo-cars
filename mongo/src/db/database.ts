import {
  ObjectId,
  MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { CarSchema } from "./schemas.ts";

const env = config();

if(!env.MONGO_USR || !env.MONGO_PWD) {
   throw Error ("MONGO_USR and MONGO_PWD must be set in .env file");
}

env.MONGO_USR;
env.MONGO_PWD;

const client = new MongoClient();

await client.connect(   
    `mongodb+srv://${env.MONGO_USR}:${env.MONGO_PWD}@cluster0.slujba9.mongodb.net/?authMechanism=SCRAM-SHA-1`,
);

const db = client.database("Cabify");
console.info("Connected to database");

export const CarsCollection = db.collection<CarSchema>("Cars");
