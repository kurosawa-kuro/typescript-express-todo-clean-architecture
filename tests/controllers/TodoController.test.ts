// src\controllers\TodoController.test.ts

import request from "supertest";
import express, { Express } from "express";
import { TodoController } from "../../src/controllers/TodoController";
import { TodoUseCase } from "../../src/usecases/TodoUseCase";
import { TodoRepository } from "../../src/repositories/TodoRepository";

describe("TodoController", () => {
  let app: Express;
  let todoController: TodoController;

  beforeEach(() => {
    const mockTodoRepository = {
      add: jest
        .fn()
        .mockImplementation((todo: { title: string }) =>
          Promise.resolve({ id: 1, title: todo.title })
        ),
    } as unknown as TodoRepository;

    const todoUseCase = new TodoUseCase(mockTodoRepository);
    todoController = new TodoController(todoUseCase);

    // Setup express app for testing
    app = express();
    app.use(express.json());
    app.post("/todos", (req, res) => todoController.add(req, res));
  });

  it("should return a todo when a post request is made", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ title: "Test todo" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, title: "Test todo" });
  });
});
