import { NavLink } from "react-router"
import { linkStyle, NavStyle } from "./RouterStyle"
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton } from "@mui/material";
const Router = () => {
    const [open, setOpen] = useState<boolean>(false);
    const toggleDrawer =
        (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event.type === 'keydown' &&((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift') ) 
            setOpen(inOpen);
        };
    return (
        <nav style={NavStyle}>
            <NavLink to="/" style={linkStyle} onClick={toggleDrawer(true)}><CiShoppingCart /></NavLink>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                            <ListItem key={text}>
                                <ListItemButton
                                >{text}</ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <NavLink to="/" style={linkStyle}><IoPersonOutline /></NavLink>
            <NavLink to="/" style={linkStyle}>שרשראות</NavLink>
            <NavLink to="/" style={linkStyle}>טבעות</NavLink>
            <NavLink to="/" style={linkStyle}>עגילים</NavLink>
            <NavLink to="/" style={linkStyle}>צמידים</NavLink>
            <NavLink to="/" style={linkStyle}>New</NavLink>
            <NavLink to="/" style={linkStyle}>49-99</NavLink>
        </nav>
    )
}
export default Router