import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import { SIGNOUT_USER } from "../../state/constants";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Context from "../../state/context";

const Signout = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const onSignout = () => {
    dispatch({ type: SIGNOUT_USER });
    console.log(`User logged out`);
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography
            variant="body1"
            className={classes.buttonText}
            style={{ display: mobileSize ? "none" : "block" }}
          >
            Logout
          </Typography>
          <ExitToAppIcon className={classes.buttonIcon} />
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex",
  },
  buttonText: {
    color: "white",
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "white",
  },
};

export default withStyles(styles)(Signout);
