import React, { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import questions from "../data/questions";

const DecisionSupportDiagnostic = ({ onSubmit }) => {
  const [situation, setSituation] = useState("");
  const [scores, setScores] = useState({
    "Managing Difficulties": { score: 0, count: 0 },
    "Academic Inconsistency": { score: 0, count: 0 },
    "Balancing Academic Life": { score: 0, count: 0 },
    "Career and Academic Decisions": { score: 0, count: 0 },
  });

  const [cbtItems, setCbtItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const scoresToSubmit = {};
    for (const [key, value] of Object.entries(scores)) {
      scoresToSubmit[key] = value.score / value.count;
    }
    onSubmit({
      scores: scoresToSubmit,
      cbtItems: cbtItems,
    });
  };

  const handleSituationChange = (event) => {
    setSituation(event.target.value);
  };

  const handleCbtItemChange = (type, name, situation, newValue) => {
    setCbtItems((prevItems) => {
      const newRating = Number(newValue);
      const existingItem = prevItems.find(
        (item) => item.name === name && item.type === type
      );

      if (existingItem) {
        existingItem.totalRating += newRating;
        existingItem.count += 1;
        existingItem.rating = existingItem.totalRating / existingItem.count;
        return [...prevItems];
      } else {
        return [
          ...prevItems,
          { type, name, rating: newRating, totalRating: newRating, count: 1 },
        ];
      }
    });
    const newRating = Number(newValue);
    setScores((prevScores) => {
      const newScore = prevScores[situation].score + newRating;
      const newCount = prevScores[situation].count + 1;
      return {
        ...prevScores,
        [situation]: { score: newScore, count: newCount },
      };
    });
  };

  const formsTheme = createTheme({
    typography: {
      fontFamily: "Poppins",
      fontSize: 12,
    },
  });

  return (
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
          <MenuItem value="Academic">Academic</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
        </Select>
      </FormControl>

      {situation === "Academic" && (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <ThemeProvider theme={formsTheme}>
              <Box key={index} sx={{ m: 3, width: 550 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontSize: 16 }}>
                    {question.text}
                  </FormLabel>
                  <RadioGroup
                    aria-label="difficulty"
                    defaultValue="1"
                    onChange={(e) =>
                      handleCbtItemChange(
                        question.cbtItem.type,
                        question.cbtItem.name,
                        question.situation,
                        e.target.value
                      )
                    }
                  >
                    <Box sx={{ mb: -2}}>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="1 - Rarely Observed"
                      />
                    </Box>
                    <Box sx={{ mb: -2 }}>
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2 - Occasionally Observed"
                      />
                    </Box>
                    <Box sx={{ mb: -2 }}>
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3 - Sometimes Observed"
                      />
                    </Box>
                    <Box sx={{ mb: -2 }}>
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="4 - Often Observed"
                      />
                    </Box>
                    <Box sx={{ mb: -2 }}>
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="5 - Always Observed"
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Box>
            </ThemeProvider>
          ))}

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
      {situation === "Personal" && (
        <div>
          <p>Forms for personal situation are currently unavailable.</p>
        </div>
      )}
    </div>
  );
};

export default DecisionSupportDiagnostic;
