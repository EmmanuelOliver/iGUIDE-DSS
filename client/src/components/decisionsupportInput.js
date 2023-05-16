import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

import axios from "axios";
import DetermineGoals from "../components/decisionsupportGoals";

const DecisionSupportInput = (props) => {
  const [situation, setSituation] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [thoughts, setThoughts] = useState([]);
  const [behaviors, setBehavior] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [sthoughts, setsThoughts] = useState("");
  const [sbehaviors, setsBehavior] = useState("");
  const [semotions, setsEmotions] = useState("");

  const [ratingThoughts, setRatingThoughts] = useState(0);
  const [ratingBehavior, setRatingBehavior] = useState(0);
  const [ratingEmotions, setRatingEmotions] = useState(0);
  const [showGoals, setShowGoals] = useState(false);

  const navigate = useNavigate();
  const { id, mbti } = props;

  useEffect(() => {
    if (situation) {
      axios
        .get("/api/situation/" + situation)
        .then((response) => {
          setThoughts(response.data.thoughts);
          setBehavior(response.data.behaviors);
          setEmotions(response.data.emotions);
        })
        .catch((err) => {
          console.log(err);

          window.alert("error");
        });
    }
  }, [situation]);

  const handleSubmit = async () => {
    if (
      !sthoughts ||
      !sbehaviors ||
      !semotions ||
      !ratingThoughts ||
      !ratingBehavior ||
      !ratingEmotions
    ) {
      setEmptyFields(["thoughts", "behavior", "emotions"]);
    } else {
      setShowGoals(true);
    }
    navigate("/determine-goals/"+id, {
      state: {
        thoughts: sthoughts,
        behaviors: sbehaviors,
        emotions: semotions,
        ratingThoughts: ratingThoughts,
        ratingBehavior: ratingBehavior,
        ratingEmotions: ratingEmotions,
        mbti: mbti,
      },
    });
  };

  const handleSituationChange = (event) => {
    setSituation(event.target.value);
  };

  const handleRatingThoughtsChange = (event) => {
    setRatingThoughts(event.target.value);
  };

  const handleRatingBehaviorChange = (event) => {
    setRatingBehavior(event.target.value);
  };

  const handleRatingEmotionsChange = (event) => {
    setRatingEmotions(3);
  };
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];
  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <div className="">
      <div className="goals">
        <h2>Problem Identification</h2>
        <FormControl sx={{ m: 1, width: 600 }}>
          <InputLabel htmlFor="grouped-select"> Situation</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Situation"
            onChange={handleSituationChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <ListSubheader>Academic</ListSubheader>
            <MenuItem value="Managing Difficulties">
              Managing Academic Difficulties
            </MenuItem>
            <MenuItem value="Motivational Strategies">
              Motivational Strategies in Online Learning
            </MenuItem>
            <ListSubheader>Vocational</ListSubheader>
            <MenuItem value="Course Confusion">Course Confusion</MenuItem>
            <MenuItem value="Career Clues">
              Career Clues for Young People
            </MenuItem>
            <ListSubheader>Personal-Social</ListSubheader>
            <MenuItem value="Self-Confidence">
              Self-Confidence and Self-esteem
            </MenuItem>
            <MenuItem value="Overcoming Bad Habits">
              Overcoming Bad Habits
            </MenuItem>
          </Select>
        </FormControl>

        {situation && (
          <div>
            <Box sx={{ m: 1, height: 10 }}></Box>
            <Typography sx={{ m: 1, width: 600 }} component="body1">
              Select a thought that are observed in the situation:
            </Typography>
            <FormControl sx={{ m: 1, width: 600 }}>
              <InputLabel id="demo-simple-select-label">Thoughts</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Thoughts"
                onChange={(e) => setsThoughts(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                {thoughts.map((thought) => (
                  <MenuItem key={thought} value={thought}>
                    {thought}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ m: 3, width: 300 }}>
              <label>Rate Thought:</label>
              <Slider
                aria-label="Rate Thoughts"
                defaultValue={0}
                getAriaValueText={valuetext}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                min={1}
                max={5}
                onChange={handleRatingThoughtsChange}
                valueLabelFormat={(value) => {
                  if (value === 1) {
                    return 'Minimal Impact';
                  }
                  if (value === 2) {
                    return 'Mild Impact';
                  }
                  if (value === 3) {
                    return 'Moderate Impact';
                  }
                  if (value === 4) {
                    return 'Severe Impact';
                  }
                  if (value === 5) {
                    return 'Overwhelming Impact';
                  }
                  return value;
                }}
              />
            </Box>
            <Box sx={{ m: 2, height: 10 }}></Box>
            <Typography sx={{ m: 1, width: 600 }} component="body1">
              Select a behavior that are observed in the situation:
            </Typography>
            <FormControl sx={{ m: 1, width: 600 }}>
              <InputLabel id="demo-simple-select-label">Behavior</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Behavior"
                onChange={(e) => setsBehavior(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                {behaviors.map((behav) => (
                  <MenuItem key={behav} value={behav}>
                    {behav}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ m: 3, width: 300 }}>
              <label>Rate Behavior:</label>
              <Slider
                aria-label="Rate Thoughts"
                defaultValue={0}
                getAriaValueText={valuetext}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                min={1}
                max={5}
                onChange={handleRatingBehaviorChange}
                valueLabelFormat={(value) => {
                  if (value === 1) {
                    return 'Minimal Impact';
                  }
                  if (value === 2) {
                    return 'Mild Impact';
                  }
                  if (value === 3) {
                    return 'Moderate Impact';
                  }
                  if (value === 4) {
                    return 'Severe Impact';
                  }
                  if (value === 5) {
                    return 'Overwhelming Impact';
                  }
                  return value;
                }}
              />
            </Box>
            <Box sx={{ m: 2, height: 10 }}></Box>
            <Typography sx={{ m: 1, width: 600 }} component="body1">
              Select emotions that are observed in the situation:
            </Typography>
            <FormControl sx={{ m: 1, width: 600 }}>
              <InputLabel id="demo-simple-select-label">Emotion</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Emotion"
                onChange={(e) => setsEmotions(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                {emotions.map((emot) => (
                  <MenuItem key={emot} value={emot}>
                    {emot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
      <button className="viewsession" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DecisionSupportInput;
