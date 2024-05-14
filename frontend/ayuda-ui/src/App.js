import './App.css';
import './components/Navbar/Navbar.js';
import Navbar from './components/Navbar/Navbar.js';
import { Access } from './pages/Auth/Access';
import { Login } from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { Maintenance } from './pages/Maintenance/Maintenance.js';
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
              <Route path='/signup' element={
                <>
                  <Signup />
                </>
              }>
              </Route>
              <Route path='/dashboard' element={
                <>
                  <Dashboard />
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
