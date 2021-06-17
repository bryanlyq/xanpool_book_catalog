const express = require("express");
const path =  require('path');
const { exit } = require("process");
const PORT =  3001;
const app = express();
const axios = require('axios') // Promise-based HTTP CLient https://www.npmjs.com/package/axios



// store best book response from 
let respBooks = {}

async function getBookAPI(){
    // FETCH BOOK LIST FROM NYTIMES API https://developer.nytimes.com/docs/books-product/1/routes/lists/%7Bdate%7D/%7Blist%7D.json/get
    axios.get('https://api.nytimes.com/svc/books/v3/lists/2020-06-17/hardcover-fiction.json?api-key=iNyoVMbARywxgNayWWkPiznPytqiA7jp')
    .then(resp => {
        console.log(`RESPONSE CODE: ${resp.status} FROM NYTIMES BOOKAPI`);
        respBooks = resp.data.results;
    })
    .catch(err => {
        if(err.fault){
            console.log(err.detail.errorcode);
        }
})
}

getBookAPI();

app.get('/', (req, res) => {
    res.send('Hello');
})

app.get('/api', (req, res) => {
    res.json({message: 'Welcome to book catalog built by Bryan :)'});
})

app.get('/api/getBooks', (req, res) => {

    getBookAPI();
    // RETURNS LIST OF BOOKS AVAILABLE FROM DATABASE OR EXTERNAL API RESPONSE     
    console.log('List of Books Sent');
    res.json(respBooks);
})

app.get('/api/getBooks/:id', (req, res) => {
    // USER QUERY ID 
    let bookId = req.params.id;
    try{
        const  book_result =  respBooks.books.find(book => book.rank === bookId)
        if (book_result){
            // IF TRUE WE RETURN THE BOOK DICTIONARY DATA WITH  RESPONSE CODE 200 AND RANK ID
            return res.status(200).json(book_result);
        }else{
            // ELSE WE THROW AN ERROR TO RETURN A RESPONSE OF 404 WITH EMPTY DICTIONARY
            throw new Error(`${bookId} not found`)
        }
    }catch(err){
        return res.status(404).json({})
    }

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


module.exports = app;