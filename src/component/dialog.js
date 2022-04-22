import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const DialogBox = ({ open , handelopen , content , functions }) => {
    console.log( 'dialogProps===>>', open   )
    return (
        <div>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handelopen } >No</Button>
                    <Button onClick={ functions }>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default DialogBox