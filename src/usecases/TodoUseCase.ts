import { TodoRepository } from "../repositories/TodoRepository";

export class TodoUseCase {
  private todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async add(title: string) {
    return await this.todoRepository.add({ title: title });
  }

  // toggle(id: number) {
  //     return this.todoRepository.toggle(id);
  // }
}
