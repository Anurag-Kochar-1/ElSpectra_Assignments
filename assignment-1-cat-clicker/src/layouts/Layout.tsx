import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const Layout = ({ children }: { children: React.ReactNode }) => {

    const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);

    const handleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };



    return (
        <Box
            sx={{ width: "100%", overflowX: "hidden" }}
        >
            <Stack>
                <Navbar handleHamburger={handleHamburger} />

                <Stack
                    direction={'row'}
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    marginTop={10}
                >
                    <Sidebar isHamburgerOpen={isHamburgerOpen} handleHamburger={handleHamburger} />
                    {children}

                </Stack>
            </Stack>
        </Box>
    )
}

export default Layout