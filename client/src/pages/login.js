import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password, userType);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

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
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}

   
    </form>

    
  )
}

export default Login;
