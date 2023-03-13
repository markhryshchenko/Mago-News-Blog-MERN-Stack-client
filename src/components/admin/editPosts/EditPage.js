import React, { useContext, useEffect } from "react";
import styles from "./editPage.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

import MuiAlert from "@mui/material/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LabelsContext, PostsContext } from "../../../context/context";
import Header from "../../header/Header";
import Aside from "../../aside/Aside";
import Footer from "../../footer/Footer";
import { Controller, useForm } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

import { editPosts } from "../../../services/postsServices";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditPage() {
  let { labels } = React.useContext(LabelsContext);
  const [post, setPost] = React.useState({});
  const [label, setLabel] = React.useState({});
  
  const { posts } = useContext(PostsContext);
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const { updatePostsToContext } = React.useContext(PostsContext);
  useEffect(() => {
    setPost(posts.find((item) => String(id) === item._id));
  }, [posts, id]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data["_id"] = post._id;
    handleClick();
    console.log(data);
    editPosts(data, post._id);
    updatePostsToContext();
    navigate("/editList");
  };

  return (
    <div className="App">
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.head}>
            <h2>Edit page {post.title}</h2>
          </div>
          <div className={styles.body}>
            <div className={styles.content}>
              <Link to={`/editList`}>
                <Button
                  type="text"
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  color="warning"
                  sx={{ mt: 3, mb: 5 }}
                >
                  back to list of posts
                </Button>
              </Link>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...register("title", { required: true })}
                        label="Title"
                        fullWidth
                        multiline
                        size="small"
                        sx={{ mb: 3 }}
                        defaultValue={post.title}
                        focused
                        {...field}
                      />
                    )}
                    name="title"
                    control={control}
                  />
                  {errors.title && (
                    <span className={styles.error}>
                      This field should be changed!
                    </span>
                  )}
                </div>
                <div>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...register("content", { required: true })}
                        label="Enter your content"
                        multiline
                        fullWidth
                        rows={10}
                        sx={{ mb: 3 }}
                        defaultValue={post.content}
                        focused
                        {...field}
                      />
                    )}
                    name="content"
                    control={control}
                  />{" "}
                  {errors.content && (
                    <span className={styles.error}>
                      This field should be changed!
                    </span>
                  )}
                </div>
                <div>Current Image</div>
                <img alt="img" className={styles.img} src={post.img} />
                   
                <div>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...register("img", { required: true })}
                        sx={{ mr: 5, mt:2 }}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        label="Image path"
                        focused
                        defaultValue={post.img}
                    
                        {...field}
                      />
                    )}
                    name="img"
                    control={control}
                   
                  />{" "}
                  {errors.content && (
                    <span className={styles.error}>
                      This field should be changed!
                    </span>
                  )}
                  <Controller
                    name="label_id"
                    render={({ field }) => (
                      <TextField
                        {...register("label_id", { required: true })}
                        sx={{mt:2}}
                        id="outlined-select-currency"
                        select
                        label="Label"
                        size="small"
                        helperText="Please select label"
                      >
                        {labels.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                        {errors.label_id && (
                          <span className={styles.error}>
                            This field should be changed!
                          </span>
                        )}
                      </TextField>
                    )}
                    control={control}
                    defaultValue=""
                  />
                  {/* <TextField
          id="outlined-select-currency"
          select
          label="Select"
         
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}
                </div>

                <Button type="submit" color="warning" variant="contained">
                  Change post
                </Button>
              </form>
            </div>
          </div>
        </div>
        <Aside />
      </main>
      <Footer />
    </div>
  );
}

export default EditPage;
