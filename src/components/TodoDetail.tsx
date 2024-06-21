import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  Alert,
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTodoContext } from "@/context/TodoContext";
import { fetchAllTodos, fetchTodoById, updateOneTodo } from "@/api/backend";
import { TodoActionTypes } from "@/context/TodoReducerTypes";
import { isError } from "@/utils/TodoUtils";
import { Todo } from "@/api/Todo";
import { ErrorSnackbar } from "./ErrorSnackbar";
import { TodoDetailSkeleton } from "./TodoDetailSkeleton";

const TodoDetail = () => {
  const { state, dispatch } = useTodoContext();
  const { todos, error, allTodosFetched } = state;

  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [editableItem, setEditableItem] = useState<Todo | undefined>();

  const previousItemRef = useRef<Todo | undefined>();
  const router = useRouter();
  const { id } = router.query;

  /**
   * Navigates back to the list view.
   * @returns {Promise<boolean>}
   */
  const navigateToList = (): Promise<boolean> => router.push("/");

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        /**
         * Find the todo item in the list of todos.
         */
        let todo = todos.find((todo) => todo.id === Number(id));

        /**
         * If the todo item is not found in the list, fetch it from the API.
         */
        if (!todo) {
          todo = await fetchTodoById(Number(id));

          /**
           * If the todo item is found, update the todo list with the new item.
           */
          if (todo) {
            dispatch({ type: TodoActionTypes.UPDATE_TODO, payload: todo });
          }
        }
        setEditableItem(todo);

        /**
         * If all todos have not been fetched yet, fetch all todos from the API.
         */
        if (!allTodosFetched) {
          const allTodos = await fetchAllTodos();
          dispatch({ type: TodoActionTypes.SET_TODOS, payload: allTodos });
        }
      } catch (error) {
        /**
         * If the error is an instance of Error, set the error message to the error message.
         */
        if (isError(error)) {
          dispatch({ type: TodoActionTypes.SET_ERROR, payload: error.message });
        } else {
          /**
           * If the error is not an instance of Error, set a generic error message.
           */
          dispatch({
            type: TodoActionTypes.SET_ERROR,
            payload: "An error occurred while fetching the todo item.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [allTodosFetched, dispatch, id, todos]);

  /**
   * Handle the update of the todo item.
   * @param {Todo} updatedItem - The updated todo item.
   */
  const handleUpdate = async (updatedItem: Todo) => {
    setUpdating(true);
    previousItemRef.current = todos.find((todo) => todo.id === updatedItem.id);
    setEditableItem(updatedItem);
    dispatch({ type: TodoActionTypes.UPDATE_TODO, payload: updatedItem });

    try {
      await updateOneTodo(updatedItem);
      setUpdateError(null);
    } catch (error) {
      if (isError(error)) {
        setUpdateError(error.message);
      } else {
        setUpdateError("An error occurred while updating the todo item.");
      }
      // Rollback to previous state if update fails
      if (previousItemRef.current) {
        setEditableItem(previousItemRef.current);
        dispatch({
          type: TodoActionTypes.UPDATE_TODO,
          payload: previousItemRef.current,
        });
      }
    } finally {
      setUpdating(false);
    }
  };

  /**
   * Handle the change of the todo item fields.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (editableItem) {
      const updatedItem = {
        ...editableItem,
        [name]: type === "checkbox" ? checked : value,
      };
      setEditableItem(updatedItem);
    }
  };

  if (loading) {
    return <TodoDetailSkeleton />;
  }

  return (
    <Container sx={{ padding: 2 }}>
      <Stack direction="row">
        <Button onClick={navigateToList} startIcon={<ArrowBackIosIcon />} />
        <Typography variant="h4">{"Todo Details"}</Typography>
      </Stack>
      {!editableItem ? (
        <Alert severity="error">Item not found</Alert>
      ) : (
        <Card>
          <CardContent>
            <FormGroup>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  name="name"
                  variant="standard"
                  value={editableItem.name}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Description"
                  name="description"
                  variant="standard"
                  value={editableItem.description}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ pl: 0 }}
                      aria-checked={editableItem.done}
                      checked={editableItem.done}
                      onChange={handleInputChange}
                      name="done"
                    />
                  }
                  label="Done"
                />
              </Stack>
            </FormGroup>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleUpdate(editableItem)}
              variant="contained"
              startIcon={
                updating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <CheckIcon />
                )
              }
              disabled={updating}
            >
              {"Save changes"}
            </Button>
          </CardActions>
        </Card>
      )}
      {error ? <ErrorSnackbar error={error} /> : null}
      {updateError ? <ErrorSnackbar error={updateError} /> : null}
    </Container>
  );
};

export default TodoDetail;
