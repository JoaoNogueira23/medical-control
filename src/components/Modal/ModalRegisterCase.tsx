import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormsRecordMedical from '../Forms/FormsRecordMedical';


type PropsModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalRecordMedical({open, setOpen}: PropsModal) {
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-record-medical"
            aria-describedby="Pop up de registro de prontuário"
        >
            <Box 
            sx={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                bgcolor: 'rgb(118,164,201)',
                border: '2px solid rgb(118,164,201)',
                boxShadow: 24,
                p: 4,
            }}
            >
                <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                    sx={{
                         gridColumn: 'span 2',
                         alignSelf: 'center'
                    }}
                    >
                        Cadastro de Prontuário
                    </Typography>

                    <Button onClick={() => setOpen(false)}
                    sx={{
                        gridColumn: 'span 1',
                        justifySelf: 'end'
                    }}
                    >
                        <HighlightOffIcon
                        sx={{
                            color: 'black'
                        }}
                        />
                    </Button>
                </Box>

                <Box>
                    <FormsRecordMedical />
                </Box>
            
            </Box>
        </Modal>
        </div>
    );
}