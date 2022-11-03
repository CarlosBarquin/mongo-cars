import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { CarsCollection } from "../db/database.ts";
import { CarSchema } from "../db/schemas.ts";

type AddCarContext = RouterContext<
    "/addCar",
    Record<string | number, string | undefined>,
    Record<string, any>
 >;

 export const addCar = async (context: AddCarContext) => {

    try{
    const body = await context.request.body({type: "json"});
    const value = await body.value;
    if(!value.plate || !value.seats){
        context.response.status = 400;
        context.response.body = {message: "mal hecho crack"};
        return;
    }

    const found = await CarsCollection.findOne({plate: value.plate});
    if(found){
        context.response.status = 400;
        context.response.body = {message: "coche en database"};
        return;
    }

    await CarsCollection.insertOne({
        ...value,
        free: true
    }); 
    
    context.response.body = {
        ...value,
        free: true
    }
  } catch (e) { 
    console.log(e);
    context.response.status = 500;
  }
  };