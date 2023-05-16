import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EdituserDetails = ({ user }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    dateOfBirth: "",
    mbti: "",
    profileImageUrl: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  
  useEffect(() => {
    if (user) {
      setFormValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        dateOfBirth: user.dateOfBirth,
        mbti: user.mbti,
        profileImageUrl: user.profileImageUrl,
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zip: user.address?.zip || "",
        country: user.address?.country || ""
      });
    }
  }, [user])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/"+user._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
    if (response.ok) {
      navigate(`/user/${user._id}`);
    } else {
      const error = await response.json()
      console.error(error)
    }
  }

  return (
    <div>
      <h2>User Details</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={formValues.bio}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formValues.dateOfBirth}
          onChange={handleChange}
        />
        <label htmlFor="mbti">MBTI:</label>
        <input
          type="text"
          id="mbti"
          name="mbti"
          value={formValues.mbti}
          onChange={handleChange}
          />
           <button type="submit">Update user</button>
    </form>
    </div>
    )
  }


    export default EdituserDetails