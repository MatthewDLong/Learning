import React, { useContext } from "react";
import Context from "../../state/context";
import { ME_QUERY } from "../../graphql/queries";
import { BASE_URL } from "../../client";
import { LOGIN_USER, IS_LOGGED_IN } from "../../state/constants";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async (googleUser) => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken },
      });
      const { me } = await client.request(ME_QUERY);
      dispatch({ type: LOGIN_USER, payload: me });
      dispatch({ type: IS_LOGGED_IN, payload: googleUser.isSignedIn() });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = (err) => {
    console.error(`Error logging in:`, err);
    dispatch({ type: IS_LOGGED_IN, payload: false });
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66,133,244)" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="1013834578518-48gfi2h7outticjli7hta03ebho4mt4t.apps.googleusercontent.com"
        isSignedIn={true}
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme="dark"
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default withStyles(styles)(Login);
