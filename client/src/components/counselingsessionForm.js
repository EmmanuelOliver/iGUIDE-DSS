import { useState, useEffect } from "react";
import { useCounselingSessionsContext } from "../hooks/usecounselingsessionContext.js";
import { useAuthContext } from "../hooks/useauthenticateContext";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CounselingSessionForm = () => {
  const { dispatch } = useCounselingSessionsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [studentUsers, setStudentUsers] = useState([]);
  const [situation, setSituation] = useState("");
  const [error, setError] = useState(null);
  const [selects, setSelects] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchStudentUsers = async () => {
      try {
        const response = await fetch("/api/user/students");
        const students = await response.json();
        setStudentUsers(students);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const counseling_session = { title, studentNo };

    const response = await fetch("/api/counseling_session", {
      method: "POST",
      body: JSON.stringify(counseling_session),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setStudentNo("");
      setEmptyFields([]);
      console.log("new Counseling Session added:", json);
      dispatch({ type: "CREATE_COUNSELINGSESSION", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a Counseling Session</h3>

      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        sx={{ width: 400 }}
      />

      <Box
        sx={{
          width: 300,
          height: 20,
        }}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={studentUsers}
        getOptionLabel={(option) => option.username}
        sx={{ width: 400 }}
        onChange={(event, newValue) => {
          if (newValue) {
            setStudentNo(newValue.username)
          } else {
            setStudentNo("")
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Student Number" />
        )}
      />

      <Box
        sx={{
          width: 300,
          height: 20,
        }}
      />
      <button>Add Session</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CounselingSessionForm
/*
   <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
         <label>Student Number: </label>
      <input
        type="number"
        onChange={(e) => setStudentNo(e.target.value)}
        value={studentNo}
        className={emptyFields.includes("studentNo") ? "error" : ""}
      />
*/
