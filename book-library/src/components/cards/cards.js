import React from 'react';
import './cards.css';
import {Card} from 'rebass';
// import App from '../../App';

const Card=() => {
    return(
        <div className="card">
            <Card width={256}>
                <Image src={props.image} />
                <Heading>Book Title</Heading>
            </Card>

            <Card width={256}>
                <Image src={props.image} alt = {props.title} />
                <Heading>Book Title</Heading>
            </Card>

            <Card width={256}>
                <Image src={props.image} />
                <Heading>Book Title</Heading>
            </Card>

        </div>
    )
}

export default Card;