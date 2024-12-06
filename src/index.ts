import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { UserController } from "./controllers/UserController";
import { DeviceController } from "./controllers/DeviceController";

const app = new Elysia()
  .use(cors())
  .use(jwt({
    name: "jwt",
    secret: "secret",
  }))
  .get("/", () => "Hello Elysia")
  .post("/api/user/signin", UserController.signIn)
  .put("/api/user/update", UserController.update)

  //
  // device
  //
  .post("/api/device/create", DeviceController.create)
  .get("/api/device/list", DeviceController.list)
  .put("/api/device/update/:id", DeviceController.update)
  .delete("/api/device/remove/:id", DeviceController.remove)

  // 
  // listen
  //
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
