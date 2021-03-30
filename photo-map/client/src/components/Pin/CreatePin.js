import React, { useState, useContext } from "react";
import axios from "axios";
import { DELETE_DRAFT } from "../../state/constants";
import { CREATE_PIN_MUTATION } from "../../graphql/mutations";
import { useClient } from "../../client";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";

import Context from "../../state/context";

const CreatePin = ({ classes }) => {
  const client = useClient();
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();

      const { latitude, longitude } = state.draft;

      const variables = {
        title,
        image: url,
        content,
        latitude,
        longitude,
      };

      await client.request(CREATE_PIN_MUTATION, variables);

      handleDeleteDraft();
    } catch (err) {
      console.error(`Error submitting pin:`, err);
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "PhotoMap");
    data.append("cloud_name", "mattsimagecloud");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/mattsimagecloud/image/upload",
      data
    );
    return res.data.url;
  };

  const handleDeleteDraft = (event) => {
    setTitle("");
    setImage("");
    setContent("");
    dispatch({ type: DELETE_DRAFT });
  };

  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        <PhotoCameraOutlinedIcon className={classes.iconLarge} /> Enter details
      </Typography>
      <div>
        <TextField
          name="title"
          label="Title"
          placeholder="Enter a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          name="content"
          label="Description"
          multiline
          rows={mobileSize ? 3 : 6}
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button
          style={{ margin: "8px" }}
          onClick={handleDeleteDraft}
          className={classes.Button}
          variant="contained"
          color="primary"
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          className={classes.Button}
          variant="contained"
          color="secondary"
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={handleSubmit}
        >
          <SaveIcon className={classes.rightIcon} />
          Submit
        </Button>
      </div>
    </form>
  );
};

const styles = (theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit,
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%",
  },
  input: {
    display: "none",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit,
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0,
  },
});

export default withStyles(styles)(CreatePin);
