import React, {useState, useEffect} from "react";
// import Card from "../cards/cards";
import API from "../../utils/API";

const Search=() => {
    // const [search, setSearch] = useState("");
    const [books, setBooks] = useState("");
  
    useEffect(() => {

      // dummy data for testing search function, please remove when implementing the search 
      const search = 'cat';

      if (!search) {
        return;
      }
  
      API.searchBooks(search)
        .then(res => {
          if (res.data.length === 0) {
            throw new Error("No results found.");
          }
          if (res.data.status === "error") {
            throw new Error(res.data.message);
          }
          setBooks([].concat(res.data.items));
          console.log(res.data.items);
        })
        .catch(err => console.error(err));
    // }, [search]);
    }, []);
  
    // const handleInputChange = event => {
    //   setSearch(event.target.value);
    // };
  
    return (
      <div>
        {/* {<Card BookCards={books} />} */}

        Result:
        {books && books.map((book) => {          
            let bookInfo = book.volumeInfo;
            if ((bookInfo.imageLinks !== undefined) && (bookInfo.imageLinks.smallThumbnail !== undefined)) {
              return (
                <div>
                  Image: <img src={bookInfo.imageLinks.smallThumbnail} alt={bookInfo.title} /><br />
                  Title: {bookInfo.title}<br />
                  Author: {bookInfo.authors.join(", ")}<br />
                  Google Book Link: <a href={bookInfo.infoLink}>{bookInfo.infoLink}</a><br />
                  Description: {bookInfo.description}
                </div>
              )
            } else {
              return null;
            }
        })}



        {/* <Container style={{ minHeight: "100vh" }}>
          <h1 className="text-center">Search For Anything on Wikipedia</h1>
          <Alert type="danger" style={{ opacity: error ? 1 : 0, marginBottom: 10 }}>
            {error}
          </Alert>
          <SearchForm
            handleInputChange={handleInputChange}
            results={search}
          />
          <SearchResults title={title} url={url} />
        </Container> */}
      </div>
    );

}

export default Search;