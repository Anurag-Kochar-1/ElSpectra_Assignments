import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AppForm from '../AppForm/AppForm';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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



            </Box>
        </Modal>
    );
}