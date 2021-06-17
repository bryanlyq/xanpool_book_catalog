
import CardList from '../components/CardList'
import React, {useState, useEffect} from "react";

const Home = () => {

    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    
    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
    
        fetch('/api/getBooks')
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            setList(result.books);
          })
        .catch((err) =>{
          console.log(err);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
      }, []);
    
    if(isLoading){
      // console.log(data)
      return(
        <div className = "App">
          <header className = "App-header">
            <h1> Loading...</h1>
          </header>
        </div>
      )
    }
    
    
    else{
     
    
      return (
        <div className="App">
          <header className="App-header">
            <h1 className = 'header_text'> Top 15 Popular Books</h1>
    
            <p className = 'publish_text'>
               Published on: {!data.published_date ? "Loading..." : data.published_date}
            </p>  
          </header>
        
          <CardList books = {list}/>
        </div>
      );
    }


}

export default Home;
