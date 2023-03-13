import React from "react";
import styles from "./admin.module.css";
import { LabelsContext, PostsContext } from "../../context/context";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { addPosts } from "../../services/postsServices";

function AddPost() {
  let { labels } = React.useContext(LabelsContext);
  let { updatePostsToContext } = React.useContext(PostsContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
   
    addPosts(data);
    updatePostsToContext();
    console.log(data);
    reset()
    //navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          {...register("title", { required: true })}
          id="outlined-textarea"
          label="Title"
          fullWidth
          multiline
          size="small"
          sx={{ mb: 3 }}
        />{" "}
        {errors.title && (
          <span className={styles.error}>This field is required</span>
        )}
      </div>
      <div>
        <TextField
          {...register("content", { required: true })}
          id="outlined-multiline-static"
          label="Enter your content"
          multiline
          fullWidth
          rows={4}
          sx={{ mb: 3 }}
        />{" "}
        {errors.content && (
          <span className={styles.error}>This field is required</span>
        )}
      </div>
      <TextField
        {...register("img", { required: true })}
        sx={{ mr: 5 }}
        id="outlined-basic"
        label="Image source"
        variant="outlined"
        size="small"
      />{" "}
      {errors.img && (
        <span className={styles.error}>This field is required</span>
      )}
      <TextField
        {...register("label_id", { required: true })}
        id="outlined-select-currency"
        select
        label="Label"
        size="small"
        defaultValue="1"
        helperText="Please select label"
      >
        {errors.label_id && (
          <span className={styles.error}>This field is required</span>
        )}
        {labels.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <div>
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          color="success"
          sx={{ mt: 3 }}
        >
          add new post
        </Button>
        <Link to={`/editList`}>
          <Button
            type="text"
            variant="contained"
            startIcon={<EditIcon />}
            color="primary"
            sx={{ mt: 3, ml: 3 }}
          >
            edit posts
          </Button>
        </Link>
      </div>
    </form>
  );
}

export default AddPost;
