import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ handleHamburger }: { handleHamburger: any }) => {
  return (
    <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleHamburger}
          sx={{ mr: 2, display: { lg: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" noWrap>
          Cat Clicker
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar