import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type AlertDialogSlideType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & DialogProps;

export default function DialogSlide(props: AlertDialogSlideType) {
  const { children, open, setOpen, ...cleanProps } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
      {...cleanProps}
    >
      {children}
    </Dialog>
  );
}
