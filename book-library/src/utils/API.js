import axios from "axios";

// Export an object containing methods we'll use for accessing the GitHub Jobs API

export default {
  searchBooks: function(query) {
    return axios.get(
      'https://www.googleapis.com/books/v1/volumes?q='+
      query+
      '&key=AIzaSyD04OyF_NfroWPvHERp0xUDD9-OIEG0Mn8'+
      '&maxResults=24'
    );
  }
};