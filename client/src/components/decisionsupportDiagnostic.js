import React, { useState } from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider  } from '@mui/material/styles';
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
  const [managingDifficulties, setManagingDifficulties] = useState(0);
  const [academicInconsistency, setAcademicInconsistency] = useState(0);
  const [balancingAcademicLife, setBalancingAcademicLife] = useState(0);
  const [careerAndAcademicDecisions, setCareerAndAcademicDecisions] =
    useState(0);

    const [managingDifficultiesScore, setManagingDifficultiesScore] = useState(0);
const [managingDifficultiesCount, setManagingDifficultiesCount] = useState(0);
const [academicInconsistencyScore, setAcademicInconsistencyScore] = useState(0);
const [academicInconsistencyCount, setAcademicInconsistencyCount] = useState(0);
  const [situation, setSituation] = useState("");
  const [cbtItems, setCbtItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      scores: {
        ManagingDifficulties: managingDifficulties,
        AcademicInconsistency: academicInconsistency,
        BalancingAcademicLife: balancingAcademicLife,
        CareerAndAcademicDecisions: careerAndAcademicDecisions,
      },
      cbtItems: cbtItems,
    });
  };

  const handleSituationChange = (event) => {
    setSituation(event.target.value);
  };

  const handleCbtItemChange = (type, name, situation, newValue) => {
    setCbtItems((prevItems) => {
      // Check if the item already exists
      const existingItem = prevItems.find(
        (item) => item.name === name && item.type === type
      );
      if (existingItem) {
        // If it exists, increment the total rating and count
        existingItem.totalRating += newValue;
        existingItem.count += 1;
        // Calculate the average rating
        existingItem.rating = existingItem.totalRating / existingItem.count;
        return [...prevItems];
      } else {
        // If it doesn't exist, create a new item
        return [
          ...prevItems,
          { type, name, rating: newValue, totalRating: newValue, count: 1 },
        ];
      }
    });

    // Update the corresponding situation score with the new value
    switch (situation) {
      case "Managing Difficulties":
        setManagingDifficultiesScore(prevScore => prevScore + newValue);
        setManagingDifficultiesCount(prevCount => prevCount + 1);
        setManagingDifficulties(managingDifficultiesScore / managingDifficultiesCount);
        break;
      case "Academic Inconsistency":
        setAcademicInconsistencyScore(prevScore => prevScore + newValue);
        setAcademicInconsistencyCount(prevCount => prevCount + 1);
        setAcademicInconsistency(academicInconsistencyScore / academicInconsistencyCount);
        break;
      case "Balancing Academic Life":
        setBalancingAcademicLife(prevScore => prevScore + newValue);
        break;
      case "Career and Academic Decisions":
        setCareerAndAcademicDecisions(prevScore => prevScore + newValue);
        break;
      default:
        console.error("Invalid situation type");
    }
  };

  const formsTheme = createTheme({
    typography: {
      body2: {
        fontSize: "0.8rem", // Adjust the font size as needed
        color: "textSecondary",
      },
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
                  <FormLabel component="legend">{question.text}</FormLabel>
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
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="1 - Rarely Observed"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="2 - Occasionally Observed"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="3 - Sometimes Observed"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="4 - Often Observed"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="5 - Always Observed"
                    />
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
