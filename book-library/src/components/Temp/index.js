import React, {useEffect} from "react";
// import Cards from "../cards/cards";
import API from "../../utils/API";

const Search = ({search, action, setBooks, setAction}) => {
    // const [search, setSearch] = useState("");

    
    useEffect(() => {

      // dummy data for testing search function, please remove when implementing the search 
      // const search = 'cat';

      if (!search) {
        return;
      }
      
      console.log('searchTerm:'+search);
      if (action) {
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
          setAction(false);
        })
        .catch(err => console.error(err));
      }
    }, [search]);
    // }, []);
  
    return (
      <div>
      </div>
    );

}

export default Search;