
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { removeCar } from "./res/delete.ts";
import { askCar } from "./res/get.ts";
import { addCar } from "./res/post.ts";



const router = new Router();

router
    .get("/test", (context) => {
        context.response.body = "Hello world!";
    })
    .post("/addCar", addCar)
    .get("/askCar", askCar)
    .delete("/removeCar/:id", removeCar);


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7777 });

