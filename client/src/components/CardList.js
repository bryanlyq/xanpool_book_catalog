import React from 'react';
import Card from './Card';

const CardList = ({books}) => {
    return(
        <div>
            {
                books.map((book,i) => {
                    // console.log(book);
                    return(
                        <Card 
                            key  = {i}
                            book_img = {book.book_image}
                            title = {book.title}
                            author = {book.author} 
                            rank = {book.rank}    

                            
                        />
                    )
                })
            }
        </div>  
    )
}

export default CardList;