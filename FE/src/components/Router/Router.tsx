import { NavLink } from "react-router";
import { linkStyle, NavStyle } from "./RouterStyle";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { Box, Button, Drawer, List, ListItem, ListItemButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCart } from "../../Redux/global/cart";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../app/firebase";
const Router = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cart = useSelector(selectCart);
  const currentUser = localStorage.getItem("currentUser");
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      console.log("התחברת בהצלחה!", user);
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
    }
  };
  const toggleDrawer =
    (inOpen: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        )
          return;
        setOpen(inOpen);
      };
  return (
    <nav style={NavStyle}>
      <NavLink to="/" style={linkStyle} onClick={toggleDrawer(true)}>
        <Button
          disableRipple
          disableElevation
          disableFocusRipple
          style={{
            minWidth: 0,
            padding: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
            border: "none",
            color: "black",
            cursor: "pointer",
          }}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:active": {
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <CiShoppingCart size={23} />
        </Button>
      </NavLink>
      <Drawer open={open} onClose={toggleDrawer(false)} >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ width: "15vw" }}
        >
          <List>
            {cart?.length ? (
              cart.map((product) => (
                <ListItem>
                  <ListItemButton>{product.name}</ListItemButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemButton>העגלה ריקה</ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
      {
        currentUser ? <NavLink to="/" style={linkStyle}>
          <IoPersonOutline />
        </NavLink> :
          <Tooltip title="התחבר עם גוגל" arrow>
            <Button
              onClick={handleGoogleLogin}

              disableRipple
              disableElevation
              disableFocusRipple
              style={{
                minWidth: 0,
                padding: 0,
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "none",
                color: "black",
                cursor: "pointer",
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:active": {
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              <IoPersonOutline size={20} />
            </Button>
          </Tooltip>
      }

      <NavLink to="/" style={linkStyle}>
        שרשראות
      </NavLink>
      <NavLink to="/" style={linkStyle}>
        טבעות
      </NavLink>
      <NavLink to="/" style={linkStyle}>
        עגילים
      </NavLink>
      <NavLink to="/" style={linkStyle}>
        צמידים
      </NavLink>
      <NavLink to="/" style={linkStyle}>
        New
      </NavLink>
      <NavLink to="/" style={linkStyle}>
        49-99
      </NavLink>
    </nav>
  );
};

export default Router;
