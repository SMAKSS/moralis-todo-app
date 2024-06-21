import { useTodoContext } from "@/context/TodoContext";
import { TodoActionTypes } from "@/context/TodoReducerTypes";
import { Snackbar } from "@mui/material";

interface InfoSnackbarProps {
  /**
   * The error message to display in the snackbar.
   */
  message: string | null;
}

export const InfoSnackbar = (props: InfoSnackbarProps) => {
  const { message } = props;

  const { dispatch } = useTodoContext();

  /**
   * Closes the snackbar.
   */
  const handleSnackbarClose = () =>
    dispatch({ type: TodoActionTypes.CLEAR_MESSAGE });

  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      message={message}
    />
  );
};
