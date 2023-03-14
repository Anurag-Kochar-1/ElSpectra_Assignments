import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import NewForm from './AddCatForm';
import CircularProgress from '@mui/material/CircularProgress';


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
    getCatAgeName?: any
}

export default function AppModal({ isModalOpen, handleModalClose, getCatAgeName }: IProps) {
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false)

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {!isFormSubmitting ? (
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Add a new Cat
                    </Typography>

                    <NewForm
                        isFormSubmitting={isFormSubmitting}
                        setIsFormSubmitting={setIsFormSubmitting}
                        handleModalClose={handleModalClose}
                    />
                </Box>
            ) : (
                <Box sx={style}>
                    <CircularProgress />
                </Box>
            )}

        </Modal>
    );
}