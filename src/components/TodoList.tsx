import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Todo } from '../api/Todo';
import { Container } from '@mui/material';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodoList = async () => {
      // TODO: Fetch todos from API
      const mockTodos = [
        { id: 0, name: 'todo 0', description: 'description 0' },
        { id: 1, name: 'todo 1', description: 'description 1' },
        { id: 2, name: 'todo 2', description: 'description 2' },
      ];
      setTodos(mockTodos);
    };

    fetchTodoList();
  }, []);

  return (
    <Container>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/item/${todo.id}`}>
              <p>
                <b>{todo.name}</b>
              </p>
              <p>{todo.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
