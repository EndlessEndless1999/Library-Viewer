import React, {useRef, useState, useEffect} from "react";
import './Search.css';
import SearchIcon from '@mui/icons-material/Search';
import Container from 'react-bootstrap/Container';
import API from "../../utils/API";

function Search({ placeholder, setBooks}) {
  const inputRef = useRef();
  const [search, setSearch] = useState("");

  const updateSearch = event => {
      setSearch(event.target.value);
  };

  const handleEnter = event => {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  // a function calling the Google Books API
  const handleSearch = () => {

    console.log("Start searching keyword: "+search);

      // dummy data for testing search function, please remove when implementing the search 
      // const search = 'cat';

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

  };

  // Set the focus to the search bar onload
  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <div className="search">
      <Container>
        <div className="searchInputs" id="search">
            <input ref={inputRef} type="text" value={search} placeholder={placeholder} onChange={updateSearch} onKeyPress={handleEnter}/>
            <div className="searchIcon">
            <SearchIcon onClick={handleSearch}/></div>
        </div>
        {/* <div className="dataResult"></div> */}
        {/* <Search searchTerm={search} /> */}
      </Container>
    </div>
  )
}

export default Search;
