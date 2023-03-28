import React from 'react';
import './cards.css';
import {Card, Image, Heading, Flex} from 'rebass';


const BookCards = ({books}) => {
    return(
        <div className='bookArea'>
        {books && books.map((book) => {         
            let bookInfo = book.volumeInfo;
            if ((bookInfo.imageLinks !== undefined) && (bookInfo.imageLinks.smallThumbnail !== undefined)) {
                return (
                    // added key to handle unique "key" pop warning
                    <div className="card" key={book.id}>
                        <Flex>
                        <Card>
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