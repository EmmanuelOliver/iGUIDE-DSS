import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useauthenticateContext";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../hooks/useuserContext";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";

import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();


  const handleClick = () => {
    logout();
  };

  const navigate = useNavigate();
  const navigatetoLogout = async () => {
    navigate("/login");
  };

  const navigatetoSignup = async () => {
    navigate("/signup");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <div class="item1">
            <img src={logo} alt="Logo" />
          </div>
          <div class="item2">
            <h1>iGUIDE</h1>
          </div>
        </Link>
        <nav>
          {user && (
            <div style={{ display: "flex", gap: "10" }}>
            {user.username !== "1704864" && (
            <div>
              <Button
                variant={location.pathname === "/" ? "outlined" : "text"}
                component={Link}
                to="/"
                color="inherit"
              >
                Home
              </Button>
              
              <Button
                variant={
                  location.pathname === "/counselingsession" ||
                  location.pathname === "/determine-goals"||
                  location.pathname === "/decisionsupport/:id"
                    ? "outlined"
                    : "text"
                }
                component={Link}
                to="/counselingsession"
                color="inherit"
              >
                Individual Counseling
              </Button>
              <Button
                variant={
                  location.pathname === "/students" ? "outlined" : "text"
                }
                component={Link}
                to="/students"
                color="inherit"
              >
                Student Profiles
              </Button>
              <Button
                variant={location.pathname === "/assessment" ? "outlined" : "text"}
                component={Link}
                to="/assessment"
                color="inherit"
              >
                Assessment
              </Button>
              </div>
            )}
            </div>
          )}
        </nav>
        <nav>
          {user && (
            <div>
              <Button
                startIcon={<PersonIcon />}
                component={Link}
                to={{
                  pathname: "/user/642651f12e8a764ae94c36dc",
                }}
                color="inherit"
                variant="text"
              >
                {user.username}
              </Button>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <button onClick={navigatetoLogout}>Login</button>
              <button onClick={navigatetoSignup}>Signup</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
