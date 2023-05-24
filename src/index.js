import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './style.css';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              {/* Auth */}
                <Route path={'/register'}  element={ <Register/> }/>
                <Route path={'/login'}  element={ <Login/> }/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
