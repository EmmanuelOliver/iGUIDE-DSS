import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import activities from "../data/activities";

const ActivityPage = (props) => {
  const { activity, index } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activities/${activity}`, { state: { activity: activity } })
  }

  return (
    <Card sx={{ width: 250, m: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Activity
        </Typography>
        <Typography variant="h5" component="div">
          {activity}
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: "rgb(204, 0, 0)" }}onClick={handleClick}>
          ViewDetails
        </Button>
      </CardActions>
    </Card>
  )
}

export default ActivityPage;
