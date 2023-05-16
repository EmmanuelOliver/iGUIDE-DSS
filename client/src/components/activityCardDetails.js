import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import activities from "../data/activities";

import Button from '@mui/material/Button'

const ActivityDetailsPage = () => {
  let navigate = useNavigate()
  let param = useParams()
  const selectedActivity = activities.find(
    (a) => a.activity === param.activity
  )
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
