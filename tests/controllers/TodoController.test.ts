// src\controllers\TodoController.test.ts

import request from "supertest";
import express, { Express } from "express";
import { TodoController } from "../../src/controllers/TodoController";
import { TodoUseCase } from "../../src/usecases/TodoUseCase";
import { TodoRepository } from "../../src/repositories/TodoRepository";

jest.mock("../../src/repositories/TodoRepository");

describe("TodoController", () => {
  let app: Express;
  let todoController: TodoController;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    todoRepository = new TodoRepository() as jest.Mocked<TodoRepository>;
    const todoUseCase = new TodoUseCase(todoRepository);
    todoController = new TodoController(todoUseCase);

    // Setup express app for testing
    app = express();
    app.use(express.json());
    app.post("/todos", (req, res) => todoController.add(req, res));
  });

  it("should return a todo when a post request is made", async () => {
    const todoTitle = "Test todo";
    todoRepository.add.mockResolvedValue({ id: 1, title: todoTitle });

    const response = await request(app)
      .post("/todos")
      .send({ title: todoTitle });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, title: todoTitle });
    expect(todoRepository.add).toHaveBeenCalledWith({ title: todoTitle });
  });
});
