import React from 'react';
import './cards.css';
import {Card, Image, Heading} from 'rebass';
// import App from '../../App';

const BookCards = (props) => {
    return(
        <div className="card">
            <Card width={256}>
                <Image src={BookCards.image} />
                <Heading>Book Title</Heading>
            </Card>

            <Card width={256}>
                <Image src={BookCards.image} alt = {props.title} />
                <Heading>Book Title</Heading>
            </Card>

            <Card width={256}>
                <Image src={BookCards.image} />
                <Heading>Book Title</Heading>
            </Card>

        </div>
    )
}

export default Card;