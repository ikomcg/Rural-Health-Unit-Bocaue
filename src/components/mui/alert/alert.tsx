import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from 'react-icons/io';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type SnackbarAlertType = {
    open : boolean
    onClose : () => void
    severity : AlertColor,
    message : string
}

export function SnackbarAlert ({
    open,
    onClose,
    severity,
    message
} : SnackbarAlertType) {

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
    
  )
}

type SimpleSnackbarType = {
    onClick : () => void
} & Omit<SnackbarAlertType, "severity">

export function SimpleSnackbar({
        open,
        onClose,
        message,
        onClick
    } : SimpleSnackbarType) {

  const action = (
    <React.Fragment>
      <Button color="primary" size="medium" onClick={onClick}>
        Ok
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}>
            <IoMdClose/>
      </IconButton>
    </React.Fragment>
  );

  return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        message={message}
        action={action}
        color='#fffffff'/>
  );
}