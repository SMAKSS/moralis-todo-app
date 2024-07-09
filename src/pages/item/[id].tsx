import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchTodoById, fetchAllTodos } from "@/api/backend";
import { useTodoContext } from "@/context/TodoContext";
import { TodoActionTypes } from "@/context/TodoReducerTypes";
import { Todo } from "@/api/Todo";
import { isError } from "@/utils/TodoUtils";
import { TodoDetailSkeleton } from "@/components/TodoDetailSkeleton";
import TodoDetail from "@/components/TodoDetail";

const ItemDetailPage = () => {
  const { state, dispatch } = useTodoContext();
  const { todos, allTodosFetched } = state;

  const [loading, setLoading] = useState<boolean>(true);
  const [editableItem, setEditableItem] = useState<Todo | undefined>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);

      try {
        // Find the todo item in the list of todos.
        let todo = todos.find((todo) => todo.id === Number(id));

        // If the todo item is not found in the list of todos, fetch it from the API.
        if (!todo) {
          todo = await fetchTodoById(Number(id));

          if (todo) {
            dispatch({ type: TodoActionTypes.UPDATE_TODO, payload: todo });
          }
        }
        setEditableItem(todo);

        // If all todos have not been fetched yet, fetch all todos from the API.
        if (!allTodosFetched) {
          const allTodos = await fetchAllTodos();
          dispatch({ type: TodoActionTypes.SET_TODOS, payload: allTodos });
        }
      } catch (error) {
        // If an error occurs while fetching the todo item, set the error message.
        if (isError(error)) {
          dispatch({ type: TodoActionTypes.SET_ERROR, payload: error.message });
        } else {
          dispatch({
            type: TodoActionTypes.SET_ERROR,
            payload: "An error occurred while fetching the todo item.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch the todo item details when the component mounts.
    if (id) {
      fetchItemDetails();
    }
  }, [id, todos, allTodosFetched, dispatch]);

  if (loading) {
    return <TodoDetailSkeleton />;
  }

  return (
    <TodoDetail editableItem={editableItem} setEditableItem={setEditableItem} />
  );
};

export default ItemDetailPage;
