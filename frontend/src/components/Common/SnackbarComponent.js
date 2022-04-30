import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { AppState } from "../../AppContext";

export const SnackbarComponent = ({ variant, message }) => {
  const {
    showSnackbar,
    setShowSnackbar,
    snackbarVariant,
    setSnackbarVariant,
    snackbarMessage,
    setSnackbarMessage,
  } = AppState();

  useEffect(() => {
    setSnackbarVariant(variant);
    setSnackbarMessage(message);
    setShowSnackbar(true);
  }, []);

  const [positionState, setPositionState] = useState({
    vertical: "bottom",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = positionState;

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
