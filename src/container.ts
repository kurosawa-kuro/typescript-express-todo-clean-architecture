// src\container.ts

import { TodoController } from "./controllers/TodoController";
import { TodoUseCase } from "./usecases/TodoUseCase";
import { TodoRepository } from "./repositories/TodoRepository";

const todoRepository = new TodoRepository();
const todoUseCase = new TodoUseCase(todoRepository);
const todoController = new TodoController(todoUseCase);

export { todoController, todoUseCase, todoRepository };
