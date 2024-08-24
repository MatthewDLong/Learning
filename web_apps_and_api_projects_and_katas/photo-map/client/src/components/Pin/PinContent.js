import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Comments from "../Comment/Comments";
import CreateComment from "../Comment/CreateComment";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FaceIcon from "@material-ui/icons/Face";
import format from "date-fns/format";

import Context from "../../state/context";

const PinContent = ({ classes }) => {
  const { state } = useContext(Context);
  const { title, content, author, createdAt, comments } = state.currentPin;
  return (
    <div className={classes.root}>
      <Typography
        component="h2"
        variant="h5"
        color="black"
        gutterBottom
        style={{ fontStyle: "italic" }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {content}
      </Typography>
      <Typography
        className={classes.text}
        variant="subtitle2"
        color="inherit"
        gutterBottom
      >
        By {author.name} - {format(Number(createdAt), "MMM do, yyyy, p")}
      </Typography>
      <CreateComment />
      <Comments comments={comments} />
    </div>
  );
};

const styles = (theme) => ({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%",
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default withStyles(styles)(PinContent);
