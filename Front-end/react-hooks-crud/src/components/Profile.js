import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <ul class="list-group">
  <li class="list-group-item disabled"><strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</li>
  <li class="list-group-item"> <strong>Id:</strong> {currentUser.id}</li>
  <li class="list-group-item"><strong>Email:</strong> {currentUser.email}</li>
  <li class="list-group-item"><strong>Authorities:</strong></li>
  <li class="list-group-item"><ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul></li>
</ul>
      <p>
        
      </p>
      <p>
       
      </p>
      <p>
        
      </p>
      
      
    </div>
  );
};

export default Profile;