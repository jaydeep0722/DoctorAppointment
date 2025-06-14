import React, { useContext } from "react";

// mui's
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FaceIcon from "@mui/icons-material/Face";
import PeopleIcon from "@mui/icons-material/People";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppContext } from "../context/AppContexts";


const HelperMuiNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setAToken, userData } = useContext(AppContext);



  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
   setAToken("");
    localStorage.removeItem("aToken");
   
  };

  const navigate = useNavigate();

  return (
    <div>
      {/* mui */}
      <Box>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="flex justify-center items-center mr-5 ">
              <Avatar>
                <img src={userData.image} className=" object-cover" alt="IMG" />
              </Avatar>
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="bg-gray-300">
          <MenuItem
            sx={{ bgcolor: "white" }}
            onClick={() => {
              navigate("/myprofile");
            }}
          >
            <FaceIcon sx={{ mr: 2 }} /> My Profile
          </MenuItem>
          <MenuItem
            sx={{ bgcolor: "white" }}
            onClick={() => {
              navigate("/myappointments");
            }}
          >
            <PeopleIcon sx={{ mr: 2 }} /> My Apppointments
          </MenuItem>
          <MenuItem sx={{ bgcolor: "white", gap: 2 }} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default HelperMuiNavbar;
