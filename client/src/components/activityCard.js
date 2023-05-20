import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/system";
import { Box, Button, Card, CardContent, CardActions, Checkbox, Typography } from '@mui/material';

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

const ActivityPage = ({
  activity,
  index,
  onStatusChange,
  onSelectionChange,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/activities/${activity.activity}`, { state: { activity } });
  };

  return (
    <Card sx={{ width: 250, m: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          pb: 0, // remove padding-bottom to reduce space between this box and the content below
        }}
      >
        <Typography sx={{ fontSize: 14, margin: '10px' }} color="text.secondary" gutterBottom>
          Activity
        </Typography>
        <Box
          sx={{
  
            display: "flex",
            alignItems: "center",
          }}
        >
          <GreenSwitch
           sx={{
            marginBottom: '20px',
            marginRight:  '-10px'
          }}
            checked={activity.status === "completed"}
            onChange={(event) =>
              onStatusChange(event.target.checked ? "completed" : "active")
            }
            inputProps={{ "aria-label": "controlled" }}
          />
          <Checkbox
            checked={activity.selected}
            onChange={(event) => onSelectionChange(event.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
      </Box>
      <CardContent sx={{
            margin: '10px',
  
          }}>
        <Typography variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography color="text.secondary">
          Status: {activity.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: "rgb(204, 0, 0)" ,
            margin: '10px'
  
          }}
          onClick={handleClick}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityPage;
