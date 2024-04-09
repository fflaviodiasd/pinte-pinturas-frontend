import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

export default function SnackbarComponent({
  snackbarOpen,
  handleCloseSnackbar,
  handleDeleteSnackbar,
  message,
  deleteButton,
  checklistButton,
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
          <React.Fragment>
            {checklistButton}
            <Button
              color="secondary"
              size="small"
              onClick={handleDeleteSnackbar}
            >
              {deleteButton}
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}
