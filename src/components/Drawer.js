import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Inbox, Logout, Mail } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useUsuario } from "../context/usuarioContext";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const {logout}=useUsuario();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ToolBar{" "}
          </Typography>
                    <Button onClick={()=>logout()}color="inherit">LogOut</Button>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />

        <List>
          <ListItem key={0} disablePadding>
            <NavLink to="/">
              <ListItemButton>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem key={1} disablePadding>
            <NavLink to="/formulario">
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary={"Formulario"} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
