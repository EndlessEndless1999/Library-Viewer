import React from 'react';
import './cards.css';
import {Card, Image, Heading, Flex} from 'rebass';
import { AddBook } from '../../App';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import SimplePopper from './PreviewButton';

const BookCards = ({books}) => {




    return(
        <div className='book-wrapper'>
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
                            <Checkbox onClick={() => {AddBook(bookId)}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            <SimplePopper message={bookInfo.description} />
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