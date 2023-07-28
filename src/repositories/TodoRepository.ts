// src\repositories\TodoRepository.ts

interface Todo {
  id: number;
  title: string;
}

export class TodoRepository {
  private todos: Todo[];

  constructor() {
    this.todos = [];
  }

  async add(todo: Omit<Todo, "id">) {
    const id = this.todos.length + 1;
    const newTodo: Todo = { ...todo, id };
    this.todos.push(newTodo);

    console.log("todos", this.todos);

    return newTodo;
  }

  async get(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  async update(updatedTodo: Todo) {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      return updatedTodo;
    } else {
      throw new Error("Todo not found");
    }
  }

  // 他のメソッド...
}
