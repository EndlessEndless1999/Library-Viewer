import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { Rating } from '@mui/material'
import { useState } from 'react'


const ReviewForm = () => {

    const [text, setText] = useState('');
    const [score, setScore] = useState('');

    const data = {
        book: 'Book',
        createdAt: 'TIMESTAMP',
        postID: 'POSTID',
        rating: score,
        text: text
    }

    function handleClick(){
        console.log(data);
    }

    function handleChange(event){
        setText(event.target.value);
    }

    function handleReviewChange(event){
        setScore(event.target.value)
    }





    return (
        <Box>
            <Label htmlFor='review'>Review</Label>
            <Rating name="size-medium" defaultValue={2} onChange={handleReviewChange}/>
            <Input
            id='reviewForm'
            name='review'
            type='review'
            placeholder='Add Your Review Here.'
            onChange={handleChange}
            />
            <Button onClick={handleClick} variant='outline' mr={2}>Submit</Button>
        </Box>
    )
}

export default ReviewForm;





