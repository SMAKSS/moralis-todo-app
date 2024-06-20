import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Button,
} from "@mui/material";
import { useTodoContext } from "@/context/TodoContext";
import { fetchAllTodos } from "@/api/backend";
import { TodoActionTypes } from "@/context/TodoReducerTypes";
import { isError } from "@/utils/TodoUtils";
import { TodoListSkeleton } from "./TodoListSkeleton";
import { useRouter } from "next/navigation";
import { ErrorSnackbar } from "./ErrorSnackbar";

const REFETCH_INTERVAL = 60000; // 1 minute

const TodoList = () => {
  const { state, dispatch } = useTodoContext();
  const { todos, error, lastFetched } = state;

  const [initialLoad, setInitialLoad] = useState<boolean>(!lastFetched);

  const router = useRouter();

  const handleViewDetails = (id: number) => router.push(`/item/${id}`);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        /**
         * Fetch the todo list from the API.
         */
        const todos = await fetchAllTodos();
        dispatch({ type: TodoActionTypes.SET_TODOS, payload: todos });
      } catch (error) {
        /**
         * If the error is an instance of Error, set the error message to the error message.
         */
        if (isError(error)) {
          dispatch({
            type: TodoActionTypes.SET_ERROR,
            payload: error.message,
          });
        } else {
          /**
           * If the error is not an instance of Error, set a generic error message.
           */
          dispatch({
            type: TodoActionTypes.SET_ERROR,
            payload: "An error occurred while fetching the todo list.",
          });
        }
      }
    };

    // Fetch the todo list only once when the component mounts
    if (initialLoad) {
      fetchTodoList().finally(() => setInitialLoad(false));
    }

    // Fetch the todo list every REFETCH_INTERVAL milliseconds
    const intervalId = setInterval(fetchTodoList, REFETCH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dispatch, initialLoad]);

  if (initialLoad && todos.length === 0) {
    return <TodoListSkeleton />;
  }

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h2">Todos</Typography>
      <Grid container spacing={4}>
        {todos.map(({ id, description, name }) => (
          <Grid item xs={12} sm={6} md={3} key={id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body1" color="GrayText">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleViewDetails(id)} size="small">
                  {"View details"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {error ? <ErrorSnackbar error={error} /> : null}
    </Container>
  );
};

export default TodoList;
