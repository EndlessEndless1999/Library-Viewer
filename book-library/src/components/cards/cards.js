import React from 'react';
import './cards.css';
import {Card, Image, Heading, Flex} from 'rebass';
// import App from '../../App';

const BookCards = ({books}) => {
    return(
        <div>
        {books && books.map((book) => {         
            let bookInfo = book.volumeInfo;
            if ((bookInfo.imageLinks !== undefined) && (bookInfo.imageLinks.smallThumbnail !== undefined)) {
                return (
                    <div className="card">
                        <Flex>
                        <Card 
                        p={3}
                        width={256}
                        color='black'
                        >
                            <Image src={bookInfo.imageLinks.smallThumbnail} />
                            <Heading>{bookInfo.title}</Heading>
                            <p>{bookInfo.description}</p>
                            {/* Author: {bookInfo.authors.join(", ")}<br />
                            Google Book Link: <a href={bookInfo.infoLink}>{bookInfo.infoLink}</a><br /> */}
                        </Card>
                        </Flex>
                    </div>
                )
            } else {
            return null;
            }
        })}       
         </div>
    )
}

export default BookCards;