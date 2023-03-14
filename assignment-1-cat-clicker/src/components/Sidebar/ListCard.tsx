import { useState } from 'react'
import { ICat } from '../../interfaces/ICatInterface'
import { increaseCatClicks } from '../../utils/increaseCatClicks'
import { increaseCatClicks as increaseCatClicksRedux, setCat, setAllCats } from "../../redux/slices/catSlice"
import { Link as RouterLink, useParams } from "react-router-dom"
import MuLink from "@mui/material/Link"
import { useDispatch } from 'react-redux'
import {
    ListItem,
    ListItemButton,
    ListItemText,
    Chip
} from '@mui/material';


const ListCard = ({ cat }: { cat: ICat }) => {
    const dispatch = useDispatch()
    const [selectedListCard, setSelectedListCard] = useState<string | null>(null);





    return (
        <MuLink
            onClick={() => {
                increaseCatClicks(cat?.id)
                dispatch(increaseCatClicksRedux())
            }}
            component={RouterLink}
            to={`/cats/${cat?.id}`}
            sx={{ color: "black", textDecoration: "none", }}
        >
            <ListItem key={cat?.catName} disablePadding>
                <ListItemButton
                // selected={cat?.id === selectedListCard}
                // onClick={() => setSelectedListCard(cat?.id === selectedListCard ? null : cat?.id)}
                // sx={{
                //     '&.Mui-selected': {
                //         backgroundColor: 'primary.main',
                //         color: 'primary.contrastText',
                //     },
                // }}
                >
                    <ListItemText primary={cat?.catName} />
                    <Chip label={cat?.clickTimes} />
                </ListItemButton>
            </ListItem>
        </MuLink>
    )
}

export default ListCard