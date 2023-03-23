import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import SearchBar from './components/SearchBar';


function App() {
  return (
    <div className='App'>
      <NavbarComp/>
      <SearchBar placeholder="So, what are we reading today?"/>
    </div>
  );
}

export default App;
