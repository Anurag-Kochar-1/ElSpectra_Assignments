import React from 'react'
import { IconButton, Snackbar } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"

interface IProps {
    isSnackbarOpen: boolean
    handleToastClick: () => void
    handleToastClose: (event: React.SyntheticEvent | Event, reason?: string) => void
    message: string | number
    autoHideDuration: number
}

const Toast = ({ isSnackbarOpen, handleToastClick, handleToastClose, message, autoHideDuration = 3500 }: IProps) => {

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToastClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleToastClose}
            message={message}
            action={action}
        />
    )
}

export default Toast