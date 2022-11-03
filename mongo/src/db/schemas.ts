import { ObjectId } from  "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { car } from "../types.ts";


export type CarSchema = car & { _id: ObjectId}