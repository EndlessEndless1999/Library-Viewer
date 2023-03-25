import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { Rating } from '@mui/material'


const ReviewForm = () => {

    function handleClick(){
        console.log('Review Working.');
    }




    return (
        <Box>
            <Label htmlFor='review'>Review</Label>
            <Rating name="size-medium" defaultValue={2} />
            <Input
            id='reviewForm'
            name='review'
            type='review'
            placeholder='Add Your Review Here.'
            />
            <Button onClick={handleClick} variant='outline' mr={2}>Submit</Button>
        </Box>
    )
}

export default ReviewForm;





