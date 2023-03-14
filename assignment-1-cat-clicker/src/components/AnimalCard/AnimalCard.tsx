import React, { useState } from "react"
import { setAllCats } from "../../redux/slices/catSlice"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { ICat } from '../../interfaces/ICatInterface';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import Toast from "../Toast/Toast";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Image from "../Image/Image";
import Box from "@mui/material/Box/Box"

interface IProps {
    cat: ICat
    page: "HOMEPAGE" | "CATPAGE"
}

export default function AnimalCard({ cat, page }: IProps) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { allCats } = useSelector((state: RootState) => state?.cat)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [value, copy] = useCopyToClipboard()
    const catNameFirstLetter = typeof cat?.catName === "string" ? cat?.catName[0] : 1
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const getCatAgeName = () => {
        if (cat?.clickTimes <= 5) return `Infant`
        else if (cat?.clickTimes > 5 && cat?.clickTimes <= 12) return `Child`
        else if (cat?.clickTimes >= 13 && cat?.clickTimes <= 25) return `Young`
        else if (cat?.clickTimes >= 26 && cat?.clickTimes <= 40) return `Middle-Age`
        else if (cat?.clickTimes >= 41 && cat?.clickTimes <= 60) return `Old`
        else if (cat?.clickTimes >= 61) return `Very Old`
        return `Old`
    }

    const handleToastClick = () => {
        setIsSnackbarOpen(true);
    };

    const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpen(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteCat = async () => {
        const catDocRef = doc(db, 'cats', cat?.id)
        await deleteDoc(catDocRef)
        dispatch(setAllCats(allCats.filter((cat_2) => cat_2?.id !== cat?.id)))
    }



    return (
        <Card
            sx={{ width: 400, margin: 5, textDecoration: "none", padding: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}
            component={RouterLink}
            to={`/cats/${cat?.id}`}
        >

            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" onClick={() => console.log(typeof cat.catName)}>
                        {catNameFirstLetter}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem
                                component={RouterLink}
                                to={`/`}
                                onClick={() => {
                                    deleteCat()
                                    handleClose()
                                }}>Delete</MenuItem>
                        </Menu>
                    </IconButton>
                }
                title={cat?.catName}
                subheader={"14 March 2023"}
            />

            {/* <CardMedia
                component="img"
                height="194"
                width="500"
                image={cat?.catImageURL}
                alt={cat?.catName as string}
                sx={{ objectFit: 'contain', borderRadius: 2, paddingY: 2 }}
                draggable={false}
            /> */}

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Image
                    src={cat?.catImageURL}
                    alt={cat?.catName?.toString()}
                    width={"500"}
                    height={"300"}
                />

            </Box>
            {page === 'CATPAGE' && (
                <>
                    <CardContent>
                        <Typography variant="body1" gutterBottom>
                            Name : {cat?.catName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            No. of times clicked : {cat?.clickTimes}
                        </Typography>

                        <Stack
                            direction={'row'}
                            justifyContent="start"
                            alignItems="center"
                        >
                            <Typography variant="body1" gutterBottom>
                                Nick Names:
                            </Typography>
                            {cat?.catNickNames?.map((catName: string | number) => {
                                return (
                                    <Typography
                                        key={catName}
                                        variant="body1"
                                        gutterBottom
                                    >
                                        {catName}
                                    </Typography>
                                )
                            })}
                        </Stack>

                        <Typography variant="body1" gutterBottom>
                            Age : {getCatAgeName()}
                        </Typography>
                    </CardContent>

                    <CardActions sx={{ padding: 2 }}>
                        <Button
                            size="small"
                            variant='outlined'
                            color="primary"
                            onClick={() => {
                                copy(window.location.href)
                                handleToastClick()
                            }}
                        >
                            Share
                        </Button>
                    </CardActions>


                    <Toast
                        isSnackbarOpen={isSnackbarOpen}
                        handleToastClick={handleToastClick}
                        handleToastClose={handleToastClose}
                        message={"Link copied to clipboard"}
                        autoHideDuration={3000}
                    />
                </>
            )}

        </Card >
    );
}