import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

export default function SnackbarComponent({
  snackbarOpen,
  handleCloseSnackbar,
  handleDeleteSnackbar,
  message,
  messagePaste,
  deleteButton,
  checklistButton,
  copyLine,
  pasteLines,
  paste,
}: any) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={messagePaste ? `${message} e ${messagePaste}` : message}
        action={
          <>
            {paste ? (
              <Button onClick={pasteLines}>Colar</Button>
            ) : (
              <>
                <Button onClick={copyLine}>Copiar</Button>
                {checklistButton}
                <Button
                  color="secondary"
                  size="small"
                  onClick={handleDeleteSnackbar}
                >
                  {deleteButton}
                </Button>
              </>
            )}
          </>
        }
      />
    </div>
  );
}
