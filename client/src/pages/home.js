import React from 'react'
import { Box, Button } from '@mui/material';
import { useAuthContext } from "../hooks/useauthenticateContext";
import { Link } from 'react-router-dom';
function Home() {
  const { user } = useAuthContext();

  return (
    <div className="home">
       <h1>Welcome to iGUIDE!</h1>
        <p><strong>iGUIDE</strong> is a Decision Support System that is focused on improving both  traditional <br></br>
        and online individual counseling sessions by assisting counselors on  collecting <br></br>  client's data 
        and be able to preview recommendations and activities for <br></br> specific counseling situations.
      </p>
      <Box sx={{ height: 30}}>
      </Box>
      <Box sx={{}}>
      {user.username !== '1704864' && (
      <Button sx={{
        fontFamily: "Poppins",
      }} variant={'outlined'} component={Link} to="/counselingsession" color="inherit">
          Start Individual Counseling
      </Button>)}
      </Box>
    </div>

  )
}

export default Home;
