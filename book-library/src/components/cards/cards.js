import React from 'react';
import './cards.css';
import {Card, Image, Heading, Flex} from 'rebass';
import { addBook } from '../../App';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const BookCards = ({books}) => {




    return(
        <div>
        {books && books.map((book) => {         
            let bookInfo = book.volumeInfo;
            let bookId = book.id;
            if ((bookInfo.imageLinks !== undefined) && (bookInfo.imageLinks.smallThumbnail !== undefined)) {
                return (
                    // added key to handle unique "key" pop warning
                    <div className="card" key={book.id}>
                        <Flex>
                        <Card 
                        p={3}
                        width={256}
                        color='black'
                        >
                            <Image src={bookInfo.imageLinks.smallThumbnail} />
                            <Heading>{bookInfo.title}</Heading>
                            <Checkbox onClick={() => {addBook(bookId)}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
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