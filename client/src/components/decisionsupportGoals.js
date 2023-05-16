import DetermineRecommendation from "./decisionsupportRecommendation"
import { Button, Box, Card, CardContent, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

function DetermineGoals() {
  const location = useLocation()
  const { result } = location.state

  const sortedSituations = Object.entries(result.situations).sort(
    ([, a], [, b]) => {
      const priorityOrder = ["High Priority", "Medium Priority", "Low Priority"]
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
    }
  )

  const goalLevel = (rating) => {
    if (rating >= 1 && rating <= 2) {
      return "Low Goal Level"
    } else if (rating === 5) {
      return "High Goal Level"
    } else {
      return "Medium Goal Level"
    }
  }

  return (
    <div>
      <h2>Situations</h2>
      {sortedSituations.map(([situation, { priority }], index) => (
        <div key={index}>
          <p>
            {situation} - {priority}
          </p>
        </div>
      ))}

      <h2>CBT Items</h2>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
      {result.cbtItems.map(({ type, name, rating, description }, index) => (
        <Card key={index} variant="outlined"   sx={{ width: 250, m: 1 }}>
          <CardContent>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body2">{goalLevel(rating)}</Typography>
            <Button onClick={() => alert(description)}>
              View Goal
            </Button>
          </CardContent>
        </Card>
       
      ))}
       </Box>
       <div>
        <DetermineRecommendation goals={result} />
      </div>
    </div>
    
  )
}



export default DetermineGoals



