import React from 'react';
import {
  // Router,
  // Route,
  // Routes,
  // Link,
  // BrowserRouter,
  Outlet,
} from 'react-router-dom';

import Social from './components/Social.jsx';

function App() {
  return (
    <div className="newspaper-texture">
      <div className="">
        <div className="subtitle-container">
          <h5
            id="subtitle"
            className=""
          >
            WellRead.
          </h5>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
