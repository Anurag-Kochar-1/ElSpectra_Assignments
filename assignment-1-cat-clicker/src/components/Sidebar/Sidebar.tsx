import { useEffect, useState } from "react"
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

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCats } from '../../redux/slices/catSlice'
import { RootState } from "../../redux/store";
import { Link as RouterLink, useParams } from "react-router-dom"
import MuLink from "@mui/material/Link"
import { increaseCatClicks } from "../../utils/increaseCatClicks";
import { ICat } from "../../interfaces/ICatInterface";
import SidebarList from "./SidebarList";


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
    const { id }: any = useParams()

    const dispatch = useDispatch()
    const { allCats, status, error } = useSelector((state: RootState) => state.cat);

    useEffect(() => {
        if (status === 'IDLE') {
            dispatch(fetchAllCats() as any);
        }
    }, [status, dispatch]);

    return (
        <Box sx={{ display: 'flex' }}>
            {isTablet && status !== 'LOADING' && status !== 'FAILED' ? (
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
                    <SidebarList allCats={allCats} />
                </Drawer>
            ) : (
                <LeftSidebar variant="permanent" open>
                    <DrawerHeader />
                    <SidebarList allCats={allCats} />
                </LeftSidebar>
            )
            }
        </Box >
    )
};

export default Sidebar