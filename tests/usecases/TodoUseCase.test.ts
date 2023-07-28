import { TodoUseCase } from "../../src/usecases/TodoUseCase";
import { TodoRepository } from "../../src/repositories/TodoRepository";

jest.mock("../../src/repositories/TodoRepository");

describe("TodoUseCase", () => {
  let todoUseCase: TodoUseCase;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    // as any is used because the jest mock function doesn't play well with the new keyword
    todoRepository = new TodoRepository() as any;
    todoUseCase = new TodoUseCase(todoRepository);
  });

  test("add() should create new todo", async () => {
    const title = "Buy groceries";

    todoRepository.add.mockResolvedValue({ id: 1, title });

    const result = await todoUseCase.add(title);

    expect(result).toEqual({ id: 1, title });
    expect(todoRepository.add).toHaveBeenCalledWith({ title });
  });
});
