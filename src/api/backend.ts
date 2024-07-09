// -- DO NOT CHANGE THIS FILE --
// This is a mock implementation of an API
// It is not a part of the challenge to fix this file's implementation

import { type Todo } from './Todo';

const punyId = () => (Date.now() + Math.random()).toString(36);
const todos: Todo[] = Array.from(
  { length: 100 },
  (_, i): Todo => ({
    id: i + 1,
    name: `Todo ${i + 1}`,
    description: `Description ${i + 1} ${punyId()}`,
    done: false,
  }),
);

const randomDelay = () => Math.random() * 5 * 1000;
const shouldFail = () => Math.random() < 0.05;

export const fetchAllTodos = async (): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, randomDelay()));

  if (shouldFail()) {
    throw new Error('Failed to fetch items.');
  }

  return todos;
};

export const fetchTodoById = async (id: number): Promise<Todo | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, randomDelay()));

  if (shouldFail()) {
    throw new Error(`Failed to fetch item with ID ${id}.`);
  }

  return todos.find((todo) => todo.id === id);
};

export const updateOneTodo = async (updatedTodo: Todo): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, randomDelay()));

  if (shouldFail()) {
    throw new Error(`Failed to update item with ID ${updatedTodo.id}.`);
  }

  const index = todos.findIndex((todo) => todo.id === updatedTodo.id);

  if (index === -1) {
    throw new Error(`Item with ID ${updatedTodo.id} not found.`);
  }

  todos[index] = updatedTodo;
  return updatedTodo;
};

export const deleteTodoById = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, randomDelay()));

  if (shouldFail()) {
    throw new Error(`Failed to delete item with ID ${id}.`);
  }

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    throw new Error(`Item with ID ${id} not found.`);
  }

  todos.splice(index, 1);
};
