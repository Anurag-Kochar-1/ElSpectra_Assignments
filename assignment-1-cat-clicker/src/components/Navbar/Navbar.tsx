import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom"
import MuLink from "@mui/material/Link"

const Navbar = ({ handleHamburger }: { handleHamburger: any }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleHamburger}
          sx={{ mr: 2, display: { lg: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <MuLink component={RouterLink} to="/" sx={{ color: "black", textDecoration: "none" }}>
          <Typography variant="h4" noWrap color="white">
            Cat Clicker
          </Typography>
        </MuLink>

      </Toolbar>
    </AppBar>
  )
}

export default Navbar