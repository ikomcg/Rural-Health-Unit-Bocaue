import * as React from "react";

type SettingMenu = {
   open: boolean;
   anchorEl: HTMLElement | null;
   OnEditPost: () => void;
   OnDeletePost: () => Promise<void>;
   setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import { MdDelete } from "react-icons/md";
import { BiDotsVerticalRounded, BiSolidPencil } from "react-icons/bi";

const StyledMenu = styled((props: MenuProps) => (
   <Menu
      elevation={0}
      anchorOrigin={{
         vertical: "bottom",
         horizontal: "right",
      }}
      transformOrigin={{
         vertical: "top",
         horizontal: "right",
      }}
      {...props}
   />
))(({ theme }) => ({
   "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
         theme.palette.mode === "light"
            ? "rgb(55, 65, 81)"
            : theme.palette.grey[300],
      boxShadow:
         "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
         padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
         "& .MuiSvgIcon-root": {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
         },
         "&:active": {
            backgroundColor: alpha(
               theme.palette.primary.main,
               theme.palette.action.selectedOpacity
            ),
         },
      },
   },
}));

export default function CustomizedMenus({
   open,
   anchorEl,
   OnEditPost,
   setAnchorEl,
   OnDeletePost,
}: SettingMenu) {
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div className="ml-auto mb-auto">
         <button onClick={handleClick}>
            <BiDotsVerticalRounded />
         </button>
         <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
               "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            <button
               onClick={OnDeletePost}
               className="flex flex-row items-center gap-2 pl-2 mb-2 w-full"
            >
               <MdDelete />
               Delete
            </button>
            <button
               className="flex flex-row items-center gap-2 pl-2 w-full"
               onClick={OnEditPost}
            >
               <BiSolidPencil />
               Edit
            </button>
         </StyledMenu>
      </div>
   );
}
