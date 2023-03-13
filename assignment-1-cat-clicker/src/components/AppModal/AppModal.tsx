import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AppForm from '../AppForm/AppForm';
import NewForm from './AddCatForm';
import { useTheme } from '@emotion/react';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "95%", sm: "90%", md: 600 },
    height: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",


};


interface IProps {
    isModalOpen: boolean
    handleModalClose: () => void
}

export default function AppModal({ isModalOpen, handleModalClose }: IProps) {
    const { cat } = useSelector((state: RootState) => state.cat)
    const theme = useTheme()


    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Add a new Cat
                </Typography>

                <NewForm handleModalClose={handleModalClose} />

            </Box>
        </Modal>
    );
}