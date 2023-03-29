import { useState } from 'react';
import React from 'react';
import {Divider, Tabs, Tab, Typography, Box, Modal, Button } from '@mui/material';
import { CommentForm } from '../App';

const CommentModal = (props) => {
        let path;
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
        function handleOpen (){
            const {postId} = props.data;
            path = postId;
            setOpen(true);
        } 
        const handleClose = () => setOpen(false);

        return (
        <>
        <Button onClick={handleOpen}>Write Comment</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <section>{open ? <CommentForm message={path}/> : <div></div>}</section>
          </Box>
        </Modal>
        </>)
      }


      export default CommentModal;