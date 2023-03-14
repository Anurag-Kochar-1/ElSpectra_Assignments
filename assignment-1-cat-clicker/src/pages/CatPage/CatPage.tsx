import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Typography from "@mui/material/Typography/Typography"
import { useSelector, useDispatch } from 'react-redux';
import { fetchCat } from '../../redux/slices/catSlice'
import { RootState } from "../../redux/store";
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';

import AnimalCard from "../../components/AnimalCard/AnimalCard"
import AppForm from '../../components/AppForm/AppForm';
import AppModal from '../../components/AppModal/AppModal';
import Gallery from '../../components/Gallery/Gallery';
import CircularProgress from '@mui/material/CircularProgress';

const CatPage = () => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme?.breakpoints.between('xs', 'md'));
    const { id }: any = useParams()
    const dispatch = useDispatch()
    const { cat, status, error, allCats } = useSelector((state: RootState) => state.cat);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    useEffect(() => {
        dispatch(fetchCat(id) as any);
    }, [id]);

    if (status === 'LOADING' || status === 'FAILED') {
        return (
            <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        )
    }

    

    return (
        <Box
            sx={{ width: "100%", }}
        >
            <Stack
                direction={isTablet ? "column" : "row"}
                justifyContent="center"
                alignItems="center"
                spacing={2}
                paddingBottom={20}
            >

                <AnimalCard cat={cat} page={"CATPAGE"}  />
                <AppModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}/>


                {cat?.id && status === 'SUCCESS' && <AppForm cat={cat} handleModalOpen={handleModalOpen} />}
            </Stack>

            <Gallery
                allCats={allCats}
                status={status}
                error={error}
                page={"HOMEPAGE"}
                title={"Cat Images Gallery"}
            />
        </Box>
    )
}

export default CatPage