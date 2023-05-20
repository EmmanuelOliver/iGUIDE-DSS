import DetermineRecommendation from "./decisionsupportRecommendation";
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Modal,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
function DetermineGoals() {
  const location = useLocation();
  const { result } = location.state;
  const [open, setOpen] = useState(false);
  const sortedSituations = Object.entries(result.situations).sort(
    ([, a], [, b]) => {
      const priorityOrder = [
        "High Priority",
        "Medium Priority",
        "Low Priority",
      ];
      return (
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    }
  );
  const oppositeMap = {
    "Procrastination": "Precrastination",
    "Difficulties": "Easy Understanding",
    "Lack of Task Completion": "Task Completion",
    "Feeling Overwhelmed": "Balanced Responsibilities",
    "Uncertainty about Future": "Career Clarity",
  };
  const goalLevelDescription = {
    "Mild Impact": "Low Goal Level",
    "Moderate Impact": "Medium Goal level",
    "Severe Impact": "High Goal Level",
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
  const goalLevel = (rating) => {
    if (rating >= 1 && rating <= 2) {
      return "Low Goal Level";
    } else if (rating === 5) {
      return "High Goal Level";
    } else {
      return "Medium Goal Level";
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Box className="goals">
        <Box sx={{ margin: "20px" }}>
          <h2>Goals</h2>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box sx={{ width: 500, margin: "10px" }}>
            {sortedSituations.map(([situation, { priority }], index) => {
              const priorityColor = getPriorityColor(priority);
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1, // adds vertical margin
                  }}
                >
                  <Typography sx={{ fontFamily: "Poppins", fontSize: "16px" }}>
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
                    <Typography
                      sx={{ fontFamily: "Poppins", fontSize: "16px" }}
                    >
                      {priority}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ width: 500, margin: "10px" }}>
            {result.cbtItems.map(
              ({ type, name, rating, description }, index) => {
                const goal = oppositeMap[name];
                const goaldescription = goalLevelDescription[description];
                const priorityColor = getPriorityColor(description);
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      my: 1, // adds vertical margin
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "Poppins", fontSize: "16px" }}
                    >
                      {goal}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: priorityColor,
                        borderRadius: "12px", // adjust for desired roundness
                        p: 1, // padding
                        color: "#fff", // white text color
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "Poppins", fontSize: "16px" }}
                      >
                        {goaldescription}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
        <Box sx={{display: "flex",  justifyContent: "space-evenly", m:"30px" }}>
          <Button
            size="small"
            align="center"
            variant="outlined"
            sx={{
              width: "400px",
              height: "40px",
              fontFamily: "Poppins",
              fontSize: "14px",
              borderColor: "black",
              color: "black",
            }}
            onClick={() => setOpen(true)}
          >
            View Individual Counseling Criteria 
          </Button>
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
                    <Typography variant="body1" component="div">
                      Criteria
                    </Typography>
                  </Box>
                </Box>
              </Modal>
            </div>
          </Modal>
        </Box>
      </Box>

      <Box>
        <DetermineRecommendation goals={result} />
      </Box>
    </Box>
  );
}

export default DetermineGoals;
