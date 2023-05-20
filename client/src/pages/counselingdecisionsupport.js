import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Box from "@mui/material/Box";

import mbtiDescriptions from "../data/mbti.js";
import DecisionSupportDiagnostics from "../components/decisionsupportDiagnostic";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    fontSize: 14,
  },
});

const DecisionSupport = () => {
  let param = useParams();

  let location = useLocation();
  let { title, studentNo } = location.state;

  const [studentName, setStudentName] = useState("");
  //const [course, setCourse] = useState("")
  const [mbti, setMbti] = useState("");
  const [resultIsDone, setresultIsDone] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (studentNo) {
      fetch("/api/user/username/" + studentNo)
        .then((response) => response.json())
        .then((data) => {
          setStudentName(data.firstName + " " + data.lastName);
          setMbti(data.mbti);
        })
        .catch((err) => {
          console.log(err);
          window.alert("error");
        });
    }
  }, [studentNo]);

  useEffect(() => {
    if (param.id) {
      fetch(`/api/counseling_session/${param.id}/results`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.situations && data.cbtItems) {
            setResult(data);
            setresultIsDone(true);
          } else {
            setresultIsDone(false);
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert("error");
          setresultIsDone(false);
        });
    }
  }, [param.id]);

  const description = mbtiDescriptions.find(
    (desc) => desc.type === mbti
  )?.description;

  const handleDiagnosticSubmit = (data) => {
    const { scores, cbtItems } = data;

    const percentages = {};
    for (const [situation, score] of Object.entries(scores)) {
      percentages[situation] = ((score / 5) * 100).toFixed(2);
    }

    const situationsWithPriority = {};
    const maxPercentage = Math.max(...Object.values(percentages).map(Number));
    for (const [situation, percentage] of Object.entries(percentages)) {
      let priority = "";
      if (parseFloat(percentage) === maxPercentage) {
        priority = "High Priority";
      } else if (parseFloat(percentage) >= maxPercentage / 2) {
        priority = "Medium Priority";
      } else {
        priority = "Low Priority";
      }
      situationsWithPriority[situation] = { percentage, priority };
    }

    const cbtItemsWithDescriptions = cbtItems.map((item) => {
      let description = "";
      if (item.rating >= 1 && item.rating <= 2) {
        description = "Mild Impact";
      } else if (item.rating === 5) {
        description = "Severe Impact";
      } else {
        description = "Moderate Impact";
      }
      return { ...item, description };
    });
    // Combine the situation priority data with the cbtItems data
    const result = {
      situations: situationsWithPriority,
      cbtItems: cbtItemsWithDescriptions,
    };

    setResult(result);
    setresultIsDone(true);
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High Priority":
        return "red";
      case "Medium Priority":
        return "orange";
      case "Low Priority":
        return "green";
      case "Mild Impact":
        return "green";
      case "Moderate Impact":
        return "orange";
      case "Severe Impact":
        return "red";
      default:
        return "black";
    }
  };
  const saveResult = () => {
    setIsResultSaved(true);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + token  // Uncomment and provide the token if required
      },
      body: JSON.stringify({ results: result }),
    };

    console.log("Sending PATCH request with options:", requestOptions);

    // Send the PATCH request to the server
    fetch(`/api/counseling_session/${param.id}/results`, requestOptions)
      .then((response) => {
        console.log("Received response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setIsResultSaved(true);
      })
      .catch((error) => {
        window.alert("Error: " + error.message);
      });
  };

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box className="DecisionSupport">
          <Card>
            <CardContent
              sx={{
                marginTop: "px",
                marginRight: "10px",
                marginBottom: "10px",
                marginLeft: "20px",
              }}
            >
              <h2>Student Overview</h2>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Student Number
              </Typography>
              <Typography variant="h6" component="div">
                {studentNo}
              </Typography>
              <Box sx={{ m: 2 }}></Box>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Student Name
              </Typography>
              <Typography variant="h6" component="div">
                {studentName}
              </Typography>
              <Box sx={{ m: 2 }}></Box>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Personality (MBTI)
              </Typography>
              <Typography variant="h6" component="div">
                {mbti}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                marginTop: "px",
                marginRight: "10px",
                marginBottom: "10px",
                marginLeft: "20px",
              }}
            >
              <Button
                size="small"
                sx={{ color: "rgb(204, 0, 0)" }}
                onClick={() => setOpen(true)}
              >
                View Profile
              </Button>
            </CardActions>
          </Card>

          <Modal open={open} onClose={() => setOpen(false)}>
            <div>
              <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Typography variant="h5" component="div">
                      {mbti}
                    </Typography>
                    <Typography variant="body1" component="div">
                      {description}
                    </Typography>
                  </Box>
                </Box>
              </Modal>
            </div>
          </Modal>
        </Box>
        {resultIsDone ? (
          <Box className="DecisionSupport">
            <Typography align="center" sx={{ fontSize: "18px" }}>
              Problem Assesment is Completed
            </Typography>
            <Box className="goals">
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <h2>Results</h2>
              </Box>
              <Box sx={{ mx: 2 }}>
                <h3>Situation</h3>
                {Object.entries(result.situations).map(
                  ([situation, { percentage, priority }]) => {
                    const priorityColor = getPriorityColor(priority);
                    return (
                      <Box
                        key={situation}
                        sx={{
                          p: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography>
                          {situation}
                        </Typography>
                        <Box
                          sx={{
                            backgroundColor: priorityColor,
                            borderRadius: "12px", // adjust for desired roundness
                            p: 1, // padding
                            color: "#fff", // white text color
                          }}
                        >
                          <Typography>{priority}</Typography>
                        </Box>
                      </Box>
                    );
                  }
                )}
                <h3>Attributes</h3>
                {result.cbtItems.map(
                  ({ type, name, description, priority }, index) => {
                    const priorityColor = getPriorityColor(description);
                    return (
                      <Box
                        key={index}
                        sx={{
                          p: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography>
                          {name}{" "}
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ fontSize: "0.700rem", color: "grey" }}
                          >
                            {type}
                          </Typography>
                        </Typography>

                        <Box
                          sx={{
                            backgroundColor: priorityColor,
                            borderRadius: "12px", // adjust for desired roundness
                            p: 1, // padding
                            color: "#fff", // white text color
                          }}
                        >
                          <Typography>{description}</Typography>
                        </Box>
                      </Box>
                    );
                  }
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                  marginBottom: "30px",
                }}
              >
                {!isResultSaved && ( // Display the "Save Results" button only if isResultSaved is false
                  <Button
                    variant="outlined"
                    sx={{
                      width: "180px",
                      height: "40px",
                      fontSize: "16px",
                      borderColor: "black",
                      color: "black",
                    }}
                    onClick={saveResult}
                  >
                    Save Results
                  </Button>
                )}

                {isResultSaved && ( // Display the second button only if isResultSaved is true
                  <Button
                    align="center"
                    variant="outlined"
                    sx={{
                      width: "500px",
                      height: "40px",
                      fontSize: "16px",
                      borderColor: "black",
                      color: "black",
                    }}
                    onClick={() =>
                      navigate("/determine-goals/" + param.id, {
                        state: { result },
                      })
                    }
                  >
                    View Counseling Goals and Recommendation
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <div className="DecisionSupport">
            <DecisionSupportDiagnostics
              id={param.id}
              mbti={mbti}
              onSubmit={handleDiagnosticSubmit}
            />
            <div></div>
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default DecisionSupport;
