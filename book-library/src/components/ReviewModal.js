import { useState } from 'react';
import React from 'react';
import ReviewCss from './ReviewModal.css';
import {Divider, Tabs, Tab, Typography, Box, Modal, Button } from '@mui/material';
import { ReviewForm } from '../App';

const ReviewModal = (props) => {
    const data = props.message;
        const style = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        };
    
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        return (
        <div className='reviewCards'>
        <Button onClick={handleOpen}>Write Review</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <section>{open ? <ReviewForm message={data}/> : <div></div>}</section>
          </Box>
        </Modal>
        </div>)
      }


      export default ReviewModal;
