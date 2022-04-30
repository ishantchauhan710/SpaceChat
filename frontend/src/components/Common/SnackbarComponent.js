import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AppState } from "../../AppContext";

/*
  Usage: <SnackbarComponent variant="warning" message="ishant" />
*/

export const SnackbarComponent = () => {
  const {
    showSnackbar,
    setShowSnackbar,
    snackbarVariant,
    setSnackbarVariant,
    snackbarMessage,
    setSnackbarMessage,
  } = AppState();


  const positionState = {
    vertical: "bottom",
    horizontal: "center",
  };

  const { vertical, horizontal } = positionState;

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={snackbarVariant}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
