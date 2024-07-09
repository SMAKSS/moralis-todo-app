import { useTodoContext } from "@/context/TodoContext";
import { TodoActionTypes } from "@/context/TodoReducerTypes";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleSnackbarClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};
