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

const DetermineRecommendation = (props) => {
  const { goals } = props;
  const [selectedActions, setSelectedActions] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const inputData = {
    thought: goals.thoughts,
    behavior: goals.behaviors,
    emotion: goals.emotions,
    thoughtLevel: goals.goalsThoughtsRating,
    behaviorLevel: goals.goalsBehaviorsRating,
    emotionLevel: goals.goalsEmotionsRating,
  };

  useEffect(() => {
    const newActions = [];
    const newActivities = [];
    for (let i = 0; i < rules.length; i++) {
      let ruleData = rules[i];
      if (evaluateCondition(ruleData, inputData)) {
        newActions.push(ruleData.action);
        newActivities.push(ruleData.concept);
        newActivities.push(ruleData.attribute);
      }
    }
    setSelectedActions([...newActions]);
    setSelectedActivities([...new Set(newActivities)]);
  }, [inputData, rules]);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsDone(true);
    navigate("/counselingsession");
  };
  return (
    <div>
      <div className="goals">
        <Box sx={{ margin: 2 }}>
          <h2>Recommendation</h2>
          {selectedActions.map((action, index) => (
            <p>{action}</p>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {selectedActivities.map((activity, index) => (
            <ActivityPage key={index} activity={activity} index={index} />
          ))}
        </Box>
        <Box sx={{ height: 20 }}></Box>
        <Box sx={{ margin: 2 }}>
          <TextField
            id="standard-multiline-static"
            label="Counselor's Note"
            multiline
            rows={5}
            defaultValue=""
            variant="standard"
            style={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ margin: 2 }}>
          <Button variant={"outlined"} color="inherit" onClick={handleClick}>
            Save Counseling Session
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default DetermineRecommendation;
