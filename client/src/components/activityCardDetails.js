import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import activities from "../data/activities";

import Button from '@mui/material/Button'

const ActivityDetailsPage = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const selectedActivity = location.state.activity;
  
  const descriptionWithLineBreaks = selectedActivity.description.replace(
    /\n/g,
    "<br>"
  )

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div>
      <h2>{selectedActivity.activity}</h2>
      <p dangerouslySetInnerHTML={{ __html: descriptionWithLineBreaks }}></p>
      <Button  variant={'outlined'} color="inherit" onClick={handleBackClick}>Go Back</Button>
    </div>
  )
}

export default ActivityDetailsPage
