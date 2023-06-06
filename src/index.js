import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './css/style.css';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import {AdminDashboard} from "./pages/admin/AdminDashboard";
import {Teams} from "./pages/admin/f1/teams/Teams";
import {TeamsShow} from "./pages/admin/f1/teams/TeamsShow";
import {Licenses} from "./pages/admin/f1/licenses/Licenses";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              {/* Auth */}
              <Route path={'/register'}  element={ <Register/> }/>
              <Route path={'/login'}  element={ <Login/> }/>

              {/* Admin */}
              <Route path={'/admin'}  element={ <AdminDashboard/> }/>

              {/* F1 Teams */}
              <Route path={'/admin/f1/teams'}  element={ <Teams/> }/>
              <Route path={'/admin/f1/teams/:id'}  element={ <TeamsShow/> }/>

              {/* F1 Licenses */}
                <Route path={'/admin/f1/licenses'}  element={ <Licenses/> }/>

          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
