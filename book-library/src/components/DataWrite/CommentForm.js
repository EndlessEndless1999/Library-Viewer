import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { useState } from 'react';


const CommentForm = (props) => {
    // const {postId, user} = props.message;
    const [text, setText] = useState('');
    const data = {
        // postId: postId,
        text: text,
        user: 'Rosie',
        createdAt: 'TIMESTAMP'
    }

    function handleClick(){
        console.log(data);
    }

    function handleChange(event){
        setText(event.target.value);
    }




    return (
        <Box>
            <Label htmlFor='comment'>Comment</Label>
            <Input
            id='commentForm'
            name='comment'
            type='comment'
            placeholder='Add Your Comment Here.'
            onChange={handleChange}
            />
            <Button onClick={handleClick} variant='outline' mr={2}>Submit</Button>
        </Box>
    )
}

export default CommentForm;