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

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCats } from '../../redux/slices/catSlice'
import { RootState } from "../../redux/store";


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

    const dispatch = useDispatch()
    const { allCats, status, error } = useSelector((state: RootState) => state.cat);

    useEffect(() => {
        if (status === 'IDLE') {
            dispatch(fetchAllCats() as any);
        }
    }, [status, dispatch]);

    if (status === 'LOADING') {
        return <div>Loading...</div>;
    }

    if (status === 'FAILED') {
        return <div>{JSON.stringify(error)}</div>;
    }


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
                        {allCats?.map((cat, index) => (
                            <Link to={`/cats/${cat?.catName}`}>
                                <ListItem key={cat?.catName} disablePadding >
                                    <ListItemButton>
                                        <ListItemText primary={cat?.catName} />
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
                        {allCats?.map((cat, index) => (
                            <Link to={`/cats/${cat?.catName}`}>
                                <ListItem key={cat?.catName} disablePadding >
                                    <ListItemButton>
                                        <ListItemText primary={cat?.catName} />
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