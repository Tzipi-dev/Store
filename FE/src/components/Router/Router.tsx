import { NavLink } from "react-router";
import { linkStyle, NavStyle } from "./RouterStyle";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCart } from "../../Redux/global/cart";
const Router = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cart = useSelector(selectCart);
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
        <CiShoppingCart />
      </NavLink>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
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
      <NavLink to="/" style={linkStyle}>
        <IoPersonOutline />
      </NavLink>
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
