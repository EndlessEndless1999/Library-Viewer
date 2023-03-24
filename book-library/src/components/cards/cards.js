import React from 'react';
import './cards.css';
import {Card, Image, Heading, Flex} from 'rebass';
// import App from '../../App';

const BookCards =() => {
    return(
        <div className="card">
            <Flex>
            <Card 
            p={3}
            width={256}
            color='black'
            >
                <Image src={BookCards.image} />
                <Heading>Book Title</Heading>
                <p>This is a description</p>
            </Card>
            </Flex>
        </div>
    )
}

export default BookCards;