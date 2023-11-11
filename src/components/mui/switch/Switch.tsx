import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

export const IOSSwitch = styled((props: SwitchProps) => (
   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
   width: 42,
   height: 26,
   padding: 0,
   "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
         transform: "translateX(16px)",
         color: "#fff",
         "& + .MuiSwitch-track": {
            backgroundColor:
               theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
            opacity: 1,
            border: 0,
         },
         "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
         },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
         color: "#33cf4d",
         border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
         color:
            theme.palette.mode === "light"
               ? theme.palette.grey[100]
               : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
         opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
   },
   "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
   },
   "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
         duration: 500,
      }),
   },
}));

// export default function CustomizedSwitches() {
//    return (
//       <FormGroup>
//          <FormControlLabel
//             control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
//             label="MUI switch"
//          />
//          <FormControlLabel
//             control={<Android12Switch defaultChecked />}
//             label="Android 12"
//          />
//          <FormControlLabel
//             control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
//             label="iOS style"
//          />
//          <Stack direction="row" spacing={1} alignItems="center">
//             <Typography>Off</Typography>
//             <AntSwitch
//                defaultChecked
//                inputProps={{ "aria-label": "ant design" }}
//             />
//             <Typography>On</Typography>
//          </Stack>
//       </FormGroup>
//    );
// }
