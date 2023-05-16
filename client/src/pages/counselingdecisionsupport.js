import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import mbtiDescriptions from "../data/mbti.js";
import DecisionSupportDiagnostics from "../components/decisionsupportDiagnostic";

const DecisionSupport = () => {
  let param = useParams();

  let location = useLocation();
  let { title, studentNo } = location.state;

  const [studentName, setStudentName] = useState("");
  //const [course, setCourse] = useState("")
  const [mbti, setMbti] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (studentNo) {
      fetch("/api/user/username/" + studentNo)
        .then((response) => response.json())
        .then((data) => {
          setStudentName(data.firstName + " " + data.lastName);
          setMbti(data.mbti);
          setIsDone(data.isDone);
        })
        .catch((err) => {
          console.log(err);
          window.alert("error");
        });
    }
  }, [studentNo]);

  const description = mbtiDescriptions.find(
    (desc) => desc.type === mbti
  )?.description;

  const camelCaseToString = (str) => {
    // Convert camelCase to string sentences
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  //dsfs
  const handleAcademicTestSubmit = (data) => {
    const { scores, cbtItems } = data;

    // Calculate the total points
    const total = Object.values(scores).reduce((a, b) => a + b, 0);

    // Calculate the percentage for each situation
    const averages = {};
    for (const [situation, score] of Object.entries(scores)) {
      averages[camelCaseToString(situation)] = (score / total).toFixed(2);
    }

    // Determine the priority level based on the percentage
    const situationsWithPriority = {};
    const maxAverage = Math.max(...Object.values(averages));
    for (const [situation, average] of Object.entries(averages)) {
      let priority = "";
      if (average === maxAverage) {
        priority = "High Priority";
      } else if (average >= maxAverage / 2) {
        priority = "Medium Priority";
      } else {
        priority = "Low Priority";
      }
      situationsWithPriority[situation] = { average, priority };
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
    setIsDone(true);
  };

  const saveResult = () => {
    // Implement save functionality here, e.g., save to localStorage, database, etc.
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="DecisionSupport">
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
            <Typography variant="h5" component="div">
              {studentNo}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Student Name
            </Typography>
            <Typography variant="h5" component="div">
              {studentName}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Personality (MBTI)
            </Typography>
            <Typography variant="h5" component="div">
              {mbti}
            </Typography>
          </CardContent>
          <CardActions sx={{
              marginTop: "px",
              marginRight: "10px",
              marginBottom: "10px",
              marginLeft: "20px",
            }}>
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
      </div>
      {isDone ? (
        <div className="DecisionSupport">
          <p>Problem Assesment is Completed.</p>
          {result && (
            <div className="goals">
              <h2>Results</h2>
              {Object.entries(result.situations).map(
                ([situation, { average, priority }]) => (
                  <p key={situation}>
                    {situation}: {average}% - {priority}
                  </p>
                )
              )}
              <h2>CBT Items</h2>
              {result.cbtItems.map(({ type, name, description }, index) => (
                <p key={index}>
                  {type} - {name}: {description}
                </p>
              ))}
              <Button onClick={saveResult}>Save Results</Button>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() =>
                navigate("/determine-goals/" + param.id, { state: { result } })
              }
            >
              View Counseling Goals and Recommendation
            </Button>
          </div>
        </div>
      ) : (
        <div className="DecisionSupport">
          <DecisionSupportDiagnostics
            id={param.id}
            mbti={mbti}
            onSubmit={handleAcademicTestSubmit}
          />
          <div></div>
        </div>
      )}
    </div>
  );
};

export default DecisionSupport;
