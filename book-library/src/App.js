import NavbarComp from './components/NavbarComp';
import Search from "./components/Search";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <div className='App'>
      <NavbarComp/>
      <Search />
    </div>
  );
}

export default App;
