import { useState } from 'react'
import { ICat } from '../../interfaces/ICatInterface'
import { increaseCatClicks } from '../../utils/increaseCatClicks'
import { increaseCatClicks as increaseCatClicksRedux, setCat, setAllCats, fetchCat } from "../../redux/slices/catSlice"
import { Link as RouterLink, useParams } from "react-router-dom"
import MuLink from "@mui/material/Link"
import { useDispatch } from 'react-redux'
import {
    ListItem,
    ListItemButton,
    ListItemText,
    Chip
} from '@mui/material';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


const ListCard = ({ cat }: { cat: ICat }) => {
    const dispatch = useDispatch()
    const [selectedListCard, setSelectedListCard] = useState<string | null>(null);
    const [catClickTimesState, setCatClickTimesState] = useState<number>(cat?.clickTimes)
    const { allCats, status, error } = useSelector((state: RootState) => state.cat);



    return (
        <MuLink
            onClick={() => {
                increaseCatClicks(cat?.id)
                // dispatch(increaseCatClicksRedux(cat?.id))
            }}
            component={RouterLink}
            to={`/cats/${cat?.id}`}
            sx={{ color: "black", textDecoration: "none", }}
        >
            <ListItem key={cat?.catName} disablePadding>
                <ListItemButton
                >
                    <ListItemText primary={cat?.catName} />
                    <Chip label={cat?.clickTimes} />
                </ListItemButton>
            </ListItem>
        </MuLink >
    )
}

export default ListCard