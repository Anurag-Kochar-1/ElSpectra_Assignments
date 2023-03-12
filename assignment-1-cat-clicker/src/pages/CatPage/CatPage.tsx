import React from 'react'
import { useParams } from "react-router-dom"
import Typography from "@mui/material/Typography/Typography"

const CatPage = () => {
    const { id }: any = useParams()

    return (
        <div>
            <Typography variant="h1" component="h2">
                {id}
            </Typography>
        </div>
    )
}

export default CatPage