import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EnhetsAdministrering from './components/EnhetsAdministrering';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Hjem</Link>  {/* Hovedlenken til hjemmesiden */}
            </li>
            <li>
              <Link to="/enhetsadministrering">EnhetsAdministrering</Link>  {/* Link til EnhetsAdministrering */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="logo-container">
                  <img src="/vite.svg" className="logo" alt="Vite logo" />
                  <img src="/react.svg" className="logo react" alt="React logo" />
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                  <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                  </button>
                </div>
              </>
            }
          />
          <Route
            path="/enhetsadministrering"
            element={
              <>
                <h1>Legg til enheter</h1>
                <EnhetsAdministrering />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
