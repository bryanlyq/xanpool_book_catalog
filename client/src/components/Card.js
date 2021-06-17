  
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ book_img, title, author, rank }) => {

  return (
    <Link
     to = {{
            pathname: `/book/${rank}`, 
            state : {rank: rank}
        }} >

        <div className='tc grow bg-dark-blue br3 pa3 ma2 dib bw2 shadow-5' >
        <img className="book_image" alt='book' src={`${book_img}`} />
        <div>
            <h4>{title}</h4>
            <p>By: {author}</p>
            <p> Rank: {rank} </p>
        </div>
        </div>
    </Link>
  );
}

export default Card;