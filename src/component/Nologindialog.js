import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const LoginDialogBox = (props) => {
    console.log('props', props)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const closeed = () => {
        props.function()
        setOpen(false);

    }
    return (
        <div>
            <p className='m-0' onClick={handleClickOpen}>
                DELETE
            </p>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >No</Button>
                    <Button onClick={closeed}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default LoginDialogBox