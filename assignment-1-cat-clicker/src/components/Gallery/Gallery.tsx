import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ICat } from '../../interfaces/ICatInterface';
import { RootState } from '../../redux/store';
import AnimalCard from '../AnimalCard/AnimalCard';

interface IProps {
    allCats: ICat[]
    status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED"
    error: null | unknown
    page: "HOMEPAGE" | "CATPAGE"
    title: string | number
}

const Gallery = ({ allCats, status, error, page, title }: IProps) => {
    // const { allCats, status, error } = useSelector((state: RootState) => state.cat);

    return (
        <Stack
            direction={"row"}
            flexWrap={"wrap"}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >

            <Typography variant='h3'>
                {title}
            </Typography>

            <Stack
                direction={"row"}
                flexWrap={"wrap"}
                justifyContent="start"
                alignItems="center"
                spacing={2}
                gap={2}
            >
                {allCats?.map((cat) => {
                    return <AnimalCard cat={cat} page={page} />
                })}

            </Stack>


        </Stack>

    )
}

export default Gallery