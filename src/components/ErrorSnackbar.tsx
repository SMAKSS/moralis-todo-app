import { Alert, Snackbar } from "@mui/material";

interface ErrorSnackbarProps {
  /**
   * The error message to display in the snackbar.
   */
  error: string | null;
}

export const ErrorSnackbar = (props: ErrorSnackbarProps) => {
  const { error } = props;

  return (
    <Snackbar open={error !== null} autoHideDuration={1000}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};
