import './App.css';
import './components/Navbar/Navbar.js';
import Navbar from './components/Navbar/Navbar.js';
import { Access } from './pages/Auth/Access';
import { Login } from './pages/Auth/Login';
import {BrowserRouter as Router, Route, Routes} from  'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
            <Routes>
              <Route path='/' element={
                <>
                  <Access />
                </>
              }>
              </Route>
              <Route path='/login' element={
                <>
                  <Login />
                </>
              }>
              </Route>
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
