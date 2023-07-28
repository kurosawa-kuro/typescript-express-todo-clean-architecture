// src\index.ts

import express, { Request, Response } from "express";
import { todoController } from "./container";

export const app = express();

app.use(express.json());

app.post("/todos", (req: Request, res: Response) =>
  todoController.add(req, res)
);
