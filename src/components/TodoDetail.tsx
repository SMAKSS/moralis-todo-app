import React, { useRef, useState } from "react";
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
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTodoContext } from "@/context/TodoContext";
import { deleteTodoById, updateOneTodo } from "@/api/backend";
import { TodoActionTypes } from "@/context/TodoReducerTypes";
import { isError } from "@/utils/TodoUtils";
import { Todo } from "@/api/Todo";
import { ErrorSnackbar } from "./ErrorSnackbar";
import { DeleteOutline } from "@mui/icons-material";
import { InfoSnackbar } from "./InfoSnackbar";

interface TodoDetailProps {
  editableItem: Todo | undefined;
  setEditableItem: React.Dispatch<React.SetStateAction<Todo | undefined>>;
}

const TodoDetail = (props: TodoDetailProps) => {
  const { editableItem, setEditableItem } = props;

  const { state, dispatch } = useTodoContext();
  const { todos, error, successMessage } = state;

  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const previousItemRef = useRef<Todo | undefined>();
  const router = useRouter();

  /**
   * Navigates back to the list view.
   * @returns {Promise<boolean>}
   */
  const navigateToList = (): Promise<boolean> => router.push("/");

  /**
   * Rolls back to the previous state in case of an error.
   */
  const rollbackState = () => {
    if (previousItemRef.current) {
      setEditableItem(previousItemRef.current);
      dispatch({
        type: TodoActionTypes.UPDATE_TODO,
        payload: previousItemRef.current,
      });
    }
  };

  /**
   * Handle the update of the todo item.
   * @param {Todo} updatedItem - The updated todo item.
   * @returns {Promise<void>}
   */
  const handleUpdate = async (updatedItem: Todo): Promise<void> => {
    setUpdating(true);
    // Save the previous item to rollback in case of an error.
    previousItemRef.current = todos.find((todo) => todo.id === updatedItem.id);
    setEditableItem(updatedItem);

    // Update the todo item in the list.
    dispatch({ type: TodoActionTypes.UPDATE_TODO, payload: updatedItem });

    try {
      // Update the todo item.
      await updateOneTodo(updatedItem);
      setActionError(null);

      // Set the success message.
      dispatch({
        type: TodoActionTypes.SET_MESSAGE,
        payload: "Todo updated successfully",
      });
    } catch (error) {
      // If an error occurs, set the error message.
      if (isError(error)) {
        setActionError(error.message);
      } else {
        setActionError("An error occurred while updating the todo item.");
      }
      // Rollback to the previous state.
      rollbackState();
    } finally {
      setUpdating(false);
    }
  };

  /**
   * Handle the deletion of the todo item.
   * @param {number} id - The ID of the todo item to delete.
   * @returns {Promise<void>}
   */
  const handleDelete = async (id: number): Promise<void> => {
    setDeleting(true);
    try {
      // Delete the todo item by ID.
      await deleteTodoById(id);
      setActionError(null);

      // Remove the todo item from the list.
      dispatch({ type: TodoActionTypes.DELETE_TODO, payload: id });
      // Set the success message.
      dispatch({
        type: TodoActionTypes.SET_MESSAGE,
        payload: "Todo deleted successfully",
      });

      // Redirect to the list view after deletion.
      navigateToList();
    } catch (error) {
      // If an error occurs, set the error message.
      if (isError(error)) {
        setActionError(error.message);
      } else {
        setActionError("An error occurred while deleting the todo item.");
      }
      // Rollback to the previous state.
      rollbackState();
    } finally {
      setDeleting(false);
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

  return (
    <Container sx={{ padding: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" gap={1}>
          <IconButton onClick={navigateToList} aria-label="Back to todo list">
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h4">{`Edit ${
            editableItem?.name ?? "todo"
          }`}</Typography>
        </Stack>
        {!editableItem ? (
          <Alert severity="error">{"Item not found"}</Alert>
        ) : (
          <Card>
            <CardContent>
              <FormGroup>
                <Stack gap={2}>
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
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
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
                <IconButton
                  onClick={() => handleDelete(editableItem.id)}
                  color="error"
                  aria-label="Delete todo"
                >
                  {deleting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <DeleteOutline />
                  )}
                </IconButton>
              </Stack>
            </CardActions>
          </Card>
        )}
      </Stack>
      {error ? <ErrorSnackbar error={error} /> : null}
      {actionError ? <ErrorSnackbar error={actionError} /> : null}
      {successMessage ? <InfoSnackbar message={successMessage} /> : null}
    </Container>
  );
};

export default TodoDetail;
