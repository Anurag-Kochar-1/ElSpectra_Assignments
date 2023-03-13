import { useState } from 'react'
import { ICat } from '../../interfaces/ICatInterface'
import { increaseCatClicks } from '../../utils/increaseCatClicks'
import { increaseCatClicks as increaseCatClicksRedux } from "../../redux/slices/catSlice"
import { Link as RouterLink } from "react-router-dom"
import MuLink from "@mui/material/Link"
import { useDispatch } from 'react-redux'
import {
    ListItem,
    ListItemButton,
    ListItemText,
    Chip
} from '@mui/material';


const ListCard = ({ cat }: { cat: ICat }) => {
    const [catClickTimesState, setCatClickTimesState] = useState<number>(cat?.clickTimes)
    const dispatch = useDispatch()


    return (
        <MuLink
            onClick={() => {
                increaseCatClicks(cat?.id)
                dispatch(increaseCatClicksRedux())
                setCatClickTimesState(catClickTimesState + 1)
            }}
            component={RouterLink}
            to={`/cats/${cat?.id}`}
            sx={{ color: "black", textDecoration: "none" }}
        >
            <ListItem key={cat?.catName} disablePadding>
                <ListItemButton >
                    <ListItemText primary={cat?.catName} />
                    <Chip label={catClickTimesState} />
                </ListItemButton>
            </ListItem>
        </MuLink>
    )
}

export default ListCard