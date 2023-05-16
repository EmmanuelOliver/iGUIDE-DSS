import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { signup, error, isLoading } = useSignup();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [mbti, setMbti] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(
      username,
      password,
      userType,
      firstName,
      lastName,
      email,
      bio,
      dateOfBirth,
      address,
      mbti
    );
  };

  const isFormValid = () => {
    return (
      username.trim() !== "" && password.trim() !== "" && userType.trim() !== ""
    );
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>User Type:</label>
      <select
        id="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="">Select user type</option>
        <option value="admin">Admin</option>
        <option value="counselor">Counselor</option>
        <option value="student">Student</option>
      </select>
      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Bio:</label>
      <textarea
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        maxLength={500}
      />

      <label>Date of Birth:</label>
      <input
        type="date"
        onChange={(e) => setDateOfBirth(e.target.value)}
        value={dateOfBirth}
      />

      <label>Street:</label>
      <input
        type="text"
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
        value={address.street}
      />

      <label>City:</label>
      <input
        type="text"
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
        value={address.city}
      />

      <label>State:</label>
      <input
        type="text"
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
        value={address.state}
      />

      <label>Zip:</label>
      <input
        type="text"
        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
        value={address.zip}
      />

      <label>Country:</label>
      <input
        type="text"
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
        value={address.country}
      />

      <label>MBTI:</label>
      <select id="mbti" value={mbti} onChange={(e) => setMbti(e.target.value)}>
        <option value="">Select MBTI type</option>
        <option value="ISTJ">ISTJ</option>
        <option value="ISFJ">ISFJ</option>
        <option value="INFJ">INFJ</option>
        <option value="INTJ">INTJ</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFP">ISFP</option>
        <option value="INFP">INFP</option>
        <option value="INTP">INTP</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFP">ESFP</option>
        <option value="ENFP">ENFP</option>
        <option value="ENTP">ENTP</option>
        <option value="ESTJ">ESTJ</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENTJ">ENTJ</option>
      </select>

      <button disabled={!isFormValid() || isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
