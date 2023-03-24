import Search from "./components/Search";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import SearchBar from './components/SearchBar';
import BookCards from "./components/cards/cards";


function App() {
  return (
    <div className='App'>
      <NavbarComp/>
      <SearchBar placeholder="So, what are we reading today?"/>
      <Search />
      <BookCards />
    </div>
  );
}

export default App;
