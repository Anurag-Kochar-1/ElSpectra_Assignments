import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ICat } from '../../interfaces/ICatInterface';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function AnimalCard({ cat }: { cat: ICat }) {

    return (
        <Card sx={{ width: 400, margin: 5 }}>
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
            />
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
                <Button size="small" variant='outlined' color="primary">Share</Button>
            </CardActions>
        </Card >
    );
}