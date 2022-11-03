import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { CarsCollection } from "../db/database.ts";
import { CarSchema } from "../db/schemas.ts";

type RealiseCarContext = RouterContext<
    "/realiseCar/:id",{
        id: string;
    } &
    Record<string | number, string | undefined>,
    Record<string, any>
 >;

 export const realiseCar = async (context: RealiseCarContext) => {
    try{
    const plate = context.params?.id;
    const car = await CarsCollection.findOne({ plate});
    if(!car){
       context.response.status = 404;
       context.response.body = {message: "car not found"};
       return;
    }
    if(car){
        if(car.free){
            context.response.status = 400;
            context.response.body = {message: "car already free"};
            return;
        }else{
            await CarsCollection.updateOne({plate}, {$set: {free: true}});
            context.response.body = {message: "car freed"};
            return;
        }
    }
    } catch (e) {
        console.log(e);
        context.response.status = 500;
    }
 }