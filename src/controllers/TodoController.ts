import { Request, Response } from "express";
import { TodoUseCase } from "../usecases/TodoUseCase";

export class TodoController {
  private todoUseCase: TodoUseCase;

  constructor(todoUseCase: TodoUseCase) {
    this.todoUseCase = todoUseCase;
  }

  async add(req: Request, res: Response) {
    try {
      const todo = await this.todoUseCase.add(req.body.title);
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
