import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Switch from '@mui/material/Switch'; import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Typography from "@mui/material/Typography";
import activities from "../data/activities";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#32cd32", // Dark green color when switch is on
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#32cd32", // Dark green color for the track when switch is on
  },
  "& .MuiSwitch-switchBase": {
    color: "#DCDCDC", // Light green color when switch is off
  },
}));

const ActivityPage = ({ activity, index, onStatusChange, onSelectionChange }) => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/activities/${activity.activity}`, { state: { activity } })
  }

  return (
    <Card sx={{ width: 250, m: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Activity
        </Typography>
        <Typography variant="h5" component="div">
        {activity.activity}
        </Typography>
        <Typography color="text.secondary">
          Status: {activity.status}
        </Typography>
        <GreenSwitch
           checked={activity.status === "completed"}
           onChange={(event) => onStatusChange(event.target.checked ? "completed" : "active")}
           inputProps={{ 'aria-label': 'controlled' }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: "rgb(204, 0, 0)" }}onClick={handleClick}>
          ViewDetails
        </Button>
        <Checkbox
    checked={activity.selected}
    onChange={(event) => onSelectionChange(event.target.checked)}
    inputProps={{ 'aria-label': 'controlled' }}
  />
      </CardActions>
    </Card>
  )
}

export default ActivityPage;
