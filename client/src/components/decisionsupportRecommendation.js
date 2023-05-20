import rules from "../data/rules.js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ActivityPage from "../components/activityCard";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import evaluateCondition from "../data/ruling.js";

import activitiesData from "../data/activities";

const DetermineRecommendation = (props) => {
  const { goals } = props;

  const [selectedActions, setSelectedActions] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [counselorNote, setCounselorNote] = useState("");
  const [selectedActivityIndices, setSelectedActivityIndices] = useState([]);
  const inputData = goals.cbtItems.map((item) => {
    return {
      type: item.type,
      name: item.name,
      rating: item.rating,
      description: item.description,
    };
  });

  useEffect(() => {
    const newActions = [];
    const newActivities = [];

    for (let i = 0; i < rules.length; i++) {
      let ruleData = rules[i];
      for (let j = 0; j < inputData.length; j++) {
        let data = inputData[j];
        if (evaluateCondition(ruleData, data)) {
          newActions.push(ruleData.action);
          newActivities.push(ruleData.recommendation);
        }
      }
    }

    setSelectedActions([...newActions]);
    const selectedActivityNames = [...new Set(newActivities)];
    const selectedActivityData = activitiesData.filter((activity) =>
      selectedActivityNames.includes(activity.activity)
    );
   setSelectedActivities(selectedActivityData);
  }, [goals, rules]);

  const [activities, setActivities] = useState(
    selectedActivities.map((activity) => ({
      ...activity,
      status: "active",
      selected: false,
    }))
  );

  useEffect(() => {
    setActivities(
      selectedActivities.map((activity) => ({
        ...activity,
        status: "active",
        selected: false,
      }))
    );
  }, [selectedActivities]);
  
  const handleStatusChange = (index, status) => {
    setActivities(prevActivities => {
      const newActivities = [...prevActivities];
      newActivities[index].status = status;
      return newActivities;
    });
  };
  
  const handleSelectionChange = (index, selected) => {
    setActivities(prevActivities => {
      const newActivities = [...prevActivities];
      newActivities[index].selected = selected;
      return newActivities;
    });
  };
  
  const navigate = useNavigate();

  const handleSaveSession = async () => {
    try {
      const response = await fetch("/api/saveCounselingSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actions: selectedActions,
          activities: selectedActivities,
          counselorNote: counselorNote,
          // add other session data here...
        }),
      });

      if (response.ok) {
        console.log("Session saved successfully");
      } else {
        console.log("Failed to save session");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handlePostToStudent = async () => {
    try {
      const response = await fetch("/api/postCounselingSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actions: selectedActions,
          activities: selectedActivities,
          counselorNote: counselorNote,
          // add other session data here...
        }),
      });

      if (response.ok) {
        console.log("Session posted to student successfully");
      } else {
        console.log("Failed to post session to student");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // The end counseling session function could call both the save and post functions
  const handleEndCounselingSession = async () => {
    handleSaveSession();
    handlePostToStudent();
    try {
      const response = await fetch("/api/updateCounselingStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "completed",
          // include other data like the session id...
        }),
      });

      if (response.ok) {
        console.log("Counseling status updated successfully");
      } else {
        console.log("Failed to update counseling status");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    navigate("/ecounselingsession");
  };

  return (
    <div>
      <div className="goals">
        <Box sx={{ margin: 2 }}>
          <h2>Recommendations</h2>
          {selectedActions.map((action, index) => (
            <p>{action}</p>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {activities.map((activity, index) => (
            <ActivityPage
              key={index}
              activity={activity}
              index={index}
              onStatusChange={(status) => handleStatusChange(index, status)}
              onSelectionChange={(selected) =>
                handleSelectionChange(index, selected)
              }
            />
          ))}
        </Box>
        <Box sx={{ height: 20 }}></Box>
        <Box sx={{ margin: 2 }}>
          <TextField
            id="standard-multiline-static"
            label="Counselor's Note"
            multiline
            rows={5}
            value={counselorNote}
            onChange={(event) => setCounselorNote(event.target.value)}
            variant="standard"
            style={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ margin: 2, display: "flex" }}>
          <Button
            variant={"outlined"}
            color="inherit"
            sx={{
              fontFamily: "Poppins",
            }}
            onClick={handleSaveSession}
          >
            Save Counseling Session
          </Button>
          <Box sx={{ margin: 1 }}> </Box>
          <Button
            variant={"outlined"}
            color="inherit"
            sx={{
              fontFamily: "Poppins",
            }}
            onClick={handlePostToStudent}
          >
            Post to Student
          </Button>
          <Box sx={{ margin: 1 }}> </Box>
          <Button
            variant={"outlined"}
            color="inherit"
            sx={{
              fontFamily: "Poppins",
            }}
            onClick={handleEndCounselingSession}
          >
            End Counseling Session
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default DetermineRecommendation;
