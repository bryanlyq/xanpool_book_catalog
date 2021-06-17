import React, {useState, useEffect} from "react";
import { useLocation , Link} from 'react-router-dom';



// MAKE USE OF EXPRESS SERVER ENDPOINT HERE

const Book = () => {
    const { state } = useLocation();
    console.log(state);

    const [isLoadingBook, setIsLoadingBook] = useState(false);
    const [isErrorBook, setIsErrorBook] = useState(false);
    const [bookdata, setBookData] = useState([]);
    
    useEffect(() => {
        setIsErrorBook(false);
        setIsLoadingBook(true);
    
        fetch(`/api/getBooks/${state.rank}`)
          .then((res) => res.json())
          .then((result) => {
            setBookData(result);
          })
        .catch((err) =>{
          console.log(err);
          setIsErrorBook(true);
        })
        .finally(() => {
          setIsLoadingBook(false);
        })
      }, []);
    
    console.log(bookdata);
    
    
    return(
        <div className="BookView">
            <div className='tc bg-dark-blue br3 pa3 ma2 dib bw2 shadow-5' >


                <img className="book_image" alt='book' src={`${bookdata.book_image}`} />
                <h3> {bookdata.title}</h3>
                <h3> Rank: {bookdata.rank} </h3>
                <h3> Author: {bookdata.author}</h3>
                <h3> {bookdata.description} </h3>
                <h3> Publisher : {bookdata.publisher}</h3>
                <a href= {bookdata.amazon_product_url}> Click here to buy now</a>

                <Link to = {{
                    pathname: `/`,
                    }}
                >
                    <button className = "back_button"> Back to home page</button>
                </Link>
            </div>
          
        </div>
    );
}

export default Book;