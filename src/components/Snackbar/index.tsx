import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function SnackbarComponent({
  snackbarOpen,
  handleCloseSnackbar,
  message,
  button,
}: any) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            {button}
          </Button>
        }
      />
    </div>
  );
}
