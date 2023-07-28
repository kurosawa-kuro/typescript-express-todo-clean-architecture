import express, { Request, Response } from "express";
import { todoController } from "./container";

const app = express();

app.use(express.json());

app.post("/todos", (req: Request, res: Response) =>
  todoController.add(req, res)
);
// app.put("/todos/:id", (req: Request, res: Response) =>
//   todoController.toggle(req, res)
// );

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
