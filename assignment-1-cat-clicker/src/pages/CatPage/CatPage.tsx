import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import Typography from "@mui/material/Typography/Typography"
import { useSelector, useDispatch } from 'react-redux';
import { fetchCat } from '../../redux/slices/catSlice'
import { RootState } from "../../redux/store";
import { Box, Stack } from '@mui/material';

import AnimalCard from "../../components/AnimalCard/AnimalCard"

const CatPage = () => {
    const { id }: any = useParams()

    const dispatch = useDispatch()
    const { cat, status, error } = useSelector((state: RootState) => state.cat);

    useEffect(() => {
        dispatch(fetchCat(id) as any);
    }, [id]);

    if (status === 'LOADING') {
        return <div>Loading...</div>;
    }

    if (status === 'FAILED') {
        return <div>{JSON.stringify(error)}</div>;
    }

    return (
        <Box
            sx={{ width: "100%" }}
        >
            <Stack
                direction={'row'}
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >

                <AnimalCard cat={cat} />
            </Stack>

            {/* <Typography variant="h1" component="h1">
                {cat?.catName}
            </Typography>
            <img src={cat?.catImageURL} alt={'test'} />; */}

        </Box>
    )
}

export default CatPage