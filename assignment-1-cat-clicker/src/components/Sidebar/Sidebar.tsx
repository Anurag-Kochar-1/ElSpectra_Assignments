import { useEffect } from "react"
import { Link } from 'react-router-dom';
import { styled } from "@mui/material/styles"
import {
    AppBar,
    Box,
    Chip,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const LeftSidebar = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
    },
}));

const Sidebar = ({ isHamburgerOpen, handleHamburger }: { isHamburgerOpen: boolean, handleHamburger: any }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between('xs', 'md'));



    return (
        <Box sx={{ display: 'flex' }}>
            {isTablet ? (
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={isHamburgerOpen}
                    onClose={handleHamburger}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleHamburger}>
                            <MenuIcon />
                        </IconButton>
                    </DrawerHeader>
                    <List>
                        {['Boots', 'Kiddos', 'Loona', 'Chinni', 'Ricky', 'Tabby'].map((text, index) => (
                            <Link to={`/cats/${text}`}>
                                <ListItem key={text} disablePadding >
                                    <ListItemButton>
                                        <ListItemText primary={text} />
                                        <Chip label={10} onClick={() => alert('clicked')} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            ) : (
                <LeftSidebar variant="permanent" open>
                    <DrawerHeader />
                    <List>
                        {['Boots', 'Kiddos', 'Loona', 'Chinni', 'Ricky', 'Tabby'].map((text, index) => (
                            <Link to={`/cats/${text}`}>
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={text} />
                                        <Chip label={10} onClick={() => alert('clicked')} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </LeftSidebar>
            )}
        </Box>
    )
};

export default Sidebar