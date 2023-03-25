import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'


const CommentForm = () => {

    function handleClick(){
        console.log('Working.');
    }




    return (
        <Box>
            <Label htmlFor='comment'>Comment</Label>
            <Input
            id='commentForm'
            name='comment'
            type='comment'
            placeholder='Add Your Comment Here.'
            />
            <Button onClick={handleClick} variant='outline' mr={2}>Submit</Button>
        </Box>
    )
}

export default CommentForm;