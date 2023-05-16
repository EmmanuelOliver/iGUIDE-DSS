import React from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ user }) => {
  const navigate = useNavigate()

  const navigateEditUser = async () => {
    navigate("/editUser/" + user._id);
  }
  return (
    <div>
      <h2>User Details</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>User Type: {user.userType}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
          <p>Date of Birth: {user.dateOfBirth}</p>
          {user.address && (
            <p>
              Address: {user.address.street || ""}, {user.address.city || ""},{" "}
              {user.address.state || ""} {user.address.zip || ""}, {user.address.country || ""}
            </p>
          )}
          <p>MBTI: {user.mbti}</p>
          <p>Profile Image URL: {user.profileImageUrl}</p>
        </>
      )}
      <h4>Counseling Sessions:</h4>
      <div className="counseling-session-details">

        
      </div>
        <button className="viewsession" onClick={navigateEditUser}>
        Edit
      </button>
    </div>
  )
}

export default UserDetails;
