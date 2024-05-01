import React from 'react';
import Snackbar from '@mui/material/Snackbar';

export const BalloonNotif = ({ open, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose(event, reason);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Entered Access Code is not correct!"
      />
    </div>
  );
};
