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

import activitiesData  from "../data/activities";

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
          //  newActivities.push(ruleData.concept);
          newActivities.push(ruleData.attribute);
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
  
  return (
    <div>
      <div className="goals">
        <Box sx={{ margin: 2 }}>
          <h2>{inputData[0].rating}</h2>
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
            onClick={handleSaveSession}
          >
            Save Counseling Session
          </Button>
          <Box sx={{ margin: 1 }}> </Box>
          <Button
            variant={"outlined"}
            color="inherit"
            onClick={handlePostToStudent}
          >
            Post to Student
          </Button>
          <Box sx={{ margin: 1 }}> </Box>
          <Button
            variant={"outlined"}
            color="inherit"
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
