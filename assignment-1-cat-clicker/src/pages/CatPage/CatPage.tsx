import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import Typography from "@mui/material/Typography/Typography"
import { useSelector, useDispatch } from 'react-redux';
import { fetchCat } from '../../redux/slices/catSlice'
import { RootState } from "../../redux/store";

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
        <div>
            <Typography variant="h1" component="h1">
                {cat?.catName}
                {/* {status === 'FAILED' && "failed"} */}
                {/* {status === 'LOADING' && "LOADING"} */}
            </Typography>
        </div>
    )
}

export default CatPage