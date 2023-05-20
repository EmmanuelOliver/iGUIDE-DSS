import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useauthenticateContext";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../hooks/useuserContext";

import React, { useState } from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import AssessmentIcon from "@mui/icons-material/Assessment";

import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleClick = () => {
    logout();
  };

  const navigate = useNavigate();
  const navigatetoLogout = async () => {
    navigate("/login");
  };

  const navigatetoSignup = async () => {
    navigate("/signup");
  };

  return (
    <header>
      <div className="container">
        <nav>
          {user && (
            <div>
              <IconButton
                edge="start"
                color="inherit"
                size="large"
                sx={{ marginTop: "10px" }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
              
                onClose={handleDrawerClose}
              >
                <List sx={{ mr: 3 }}>
                  <ListItem button component={Link} to="/" sx={{ my: 2 }}>
                    <ListItemIcon sx={{ mr: "-20px" }}>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ sx: { fontFamily: "Poppins" } }} primary="Home" />

                  </ListItem>

                  <ListItem
                    button
                    component={Link}
                    to="/counselingsession"
                    sx={{ my: 2 }}
                  >
                    <ListItemIcon sx={{ mr: "-20px" }}>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ sx: { fontFamily: "Poppins" } }} primary="Indvidual Counseling" />
                  </ListItem>

                  <ListItem
                    button
                    component={Link}
                    to="/students"
                    sx={{ my: 2 }}
                  >
                    <ListItemIcon sx={{ mr: "-20px"}}>
                      <FileIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ sx: { fontFamily: "Poppins" } }} primary="Student Profiles" />
                  </ListItem>

                  <ListItem
                    button
                    component={Link}
                    to="/assessment"
                    sx={{ my: 2 }}
                  >
                    <ListItemIcon sx={{ mr: "-20px" }}>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ sx: { fontFamily: "Poppins" } }} primary="Assessment" />
                  </ListItem>
                </List>
              </Drawer>
            </div>
          )}
          <Link to="/">
            <div class="item1">
              <img src={logo} alt="Logo" />
            </div>
            <div class="item2">
              <h1>iGUIDE</h1>
            </div>
          </Link>
        </nav>

        <nav>
          {user && (
            <div>
              <Button
                startIcon={<PersonIcon />}
                component={Link}
                to={{
                  pathname: "/user/642651f12e8a764ae94c36dc",
                }}
                color="inherit"
                variant="text"
              >
                {user.username}
              </Button>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <button onClick={navigatetoLogout}>Login</button>
              <button onClick={navigatetoSignup}>Signup</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
