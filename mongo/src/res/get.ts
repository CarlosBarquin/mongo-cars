import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { CarsCollection } from "../db/database.ts";
import { CarSchema } from "../db/schemas.ts";

type AskCarContext = RouterContext<
    "/askCar",
    Record<string | number, string | undefined>,
    Record<string, any>
 >;

    export const askCar = async (context: AskCarContext) => {
        try{
        const cars = await CarsCollection.find({free: true}).toArray();
        if(cars.length>0){
            context.response.body = cars[0].Plate;
            await CarsCollection.updateOne({plate: cars[0].Plate}, {$set: {free: false}});
        }else{
            context.response.body = "No cars available";
            context.response.status = 404;
        }
        }catch (e) {
            console.log(e);
            context.response.status = 500;
        }
    }