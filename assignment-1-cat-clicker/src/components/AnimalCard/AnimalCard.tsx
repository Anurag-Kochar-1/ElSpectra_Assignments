import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { ICat } from '../../interfaces/ICatInterface';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom"

interface IProps {
    cat: ICat
    page: "HOMEPAGE" | "CATPAGE"
}

export default function AnimalCard({ cat, page }: IProps) {

    return (
        <Card
            sx={{  width: 400, margin: 5, textDecoration: "none", padding: 2 }}
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
                        >
                            Share
                        </Button>
                    </CardActions>
                </>
            )}

        </Card >
    );
}