import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import memories from "../../Images/memories.png";
import memoriesText from "../../Images/memories-Text.png";
import useStyles from "./styles";
import decode from "jwt-decode";
import { LOGOUT } from "../../constants/index";
const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: LOGOUT });

    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.data?.token || user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken?.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="iconText" height="45px" />
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.data?.result?.name || user?.result?.name}
              src={user.data?.result?.imageUrl || user?.result?.imageUrl}
            >
              {user.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.data?.result?.name || user?.result?.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
