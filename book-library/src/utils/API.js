import axios from "axios";

// Export an object containing methods we'll use for accessing the Google Books API
// By default, the maxResults value is 10 and the maximum allowable value is 40
export default {
  searchBooks: function(query) {
    return axios.get(
      'https://www.googleapis.com/books/v1/volumes?q='+
      query+
      '&key=AIzaSyD04OyF_NfroWPvHERp0xUDD9-OIEG0Mn8'+
      '&maxResults=16'
    );
  }
};

