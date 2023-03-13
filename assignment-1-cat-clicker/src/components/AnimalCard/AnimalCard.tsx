import React, { useState } from "react"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { ICat } from '../../interfaces/ICatInterface';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close"
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

interface IProps {
    cat: ICat
    page: "HOMEPAGE" | "CATPAGE"
}

export default function AnimalCard({ cat, page }: IProps) {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [value, copy] = useCopyToClipboard()


    const handleClick = () => {
        setIsSnackbarOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpen(false);
    };


    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Card
            sx={{ width: 400, margin: 5, textDecoration: "none", padding: 2 }}
            component={RouterLink}
            to={`/cats/${cat?.id}`}
        >
            <Stack sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {cat?.catName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    No. of times clicked : {cat?.clickTimes}
                </Typography>

            </Stack>
            <CardMedia
                component="img"
                height="194"
                image={cat?.catImageURL}
                alt={cat?.catName as string}
                sx={{ objectFit: 'contain', borderRadius: 2 }}
                draggable={false}
            />

            {page === 'CATPAGE' && (
                <>
                    <CardContent>

                        <Stack
                            direction={'row'}
                            justifyContent="start"
                            alignItems="center"
                            spacing={3}
                        >
                            {cat?.catNickNames?.map((catName: string | number) => {
                                return (
                                    <Typography
                                        key={catName}
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        {catName}
                                    </Typography>
                                )
                            })}
                        </Stack>

                        <Typography variant="subtitle1" gutterBottom>
                            {cat?.catAge}
                        </Typography>



                    </CardContent>
                    <CardActions sx={{ padding: 2 }}>
                        <Button
                            size="small"
                            variant='outlined'
                            color="primary"
                            onClick={() => {
                                copy(window.location.href)
                                handleClick()
                            }}
                        >
                            Share
                        </Button>
                    </CardActions>

                    <Snackbar
                        open={isSnackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleClose}
                        message="Link copied to clipboard"
                        action={action}
                    />
                </>
            )}

        </Card >
    );
}