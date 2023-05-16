import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/user/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = students.filter((student) =>
      student.username.toLowerCase().includes(term)
    );
    setFilteredStudents(filtered);
  };
  /*
  const navigate = useNavigate();
  const navigatetoUser = async () => {
    
    navigate("/user/" + user._id, {
      state: {
       userId : user._id
      }
    })
  }*/
  return (
    <div>
      <h1>Student List</h1>
      <TextField
  value={searchTerm}
  onChange={handleSearch}
  variant="outlined"
  margin="dense"
  sx={{ mt: 1, mb: 1 }}
  placeholder="Search"
  InputProps={{
    startAdornment: <SearchIcon position="start" />,
  }}
/>;
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>MBTI</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>
                <Link
                  to={{
                    pathname: "/user/" + student._id,
                  }}
                >
                  {student.username}
                </Link>
              </td>
              <td>
                  {student.lastName}
              </td>
              <td>
                  {student.firstName}
              </td>
              <td>
                BS Computer Science
              </td>
              <td>
                  {student.mbti}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListPage;
