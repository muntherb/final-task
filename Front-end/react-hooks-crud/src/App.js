// import React from "react";
import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AuthService from "./services/auth.service";
import AddFlight from "./components/AddFlight";
import Flight from "./components/Flight";
import FlightsList from "./components/FlightsList";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";



const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Munther Airport
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
             <Link to={"/flights"} className="nav-link">
               Flights
             </Link>
           </li>
           {/* {showModeratorBoard && (
           <li className="nav-item">
             <Link to={"/add"} className="nav-link">
               Add flight
            </Link>
           </li>
           )} */}

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
            
            
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {/* {showAdminBoard && (
           <li className="nav-item">
             <Link to={"/add"} className="nav-link">
               Add flight
            </Link>
           </li>
           )} */}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route exact path={["/", "/flights"]} component={FlightsList} />
           <Route exact path="/add" component={AddFlight} />
           <Route path="/flights/:id" component={Flight} />
        </Switch>
      </div>
    </div>
  );
};


// function App() {
//   return (
//     <div>
//       <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <a href="/flights" className="navbar-brand">
//           Munther Flights!
//         </a>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/flights"} className="nav-link">
//               Flights
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to={"/add"} className="nav-link">
//               Add
//             </Link>
//           </li>
//         </div>
//       </nav>

//       <div className="container mt-3">
//         <Switch>
//           
//         </Switch>
//       </div>
//     </div>
//   );
// }

export default App;