import styles from "../admin.module.css";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deletePosts } from "../../../services/postsServices";
import React from "react";
import { Link } from "react-router-dom";

function EditCard({ post,updatePostsToContext }) {
  
  
  return (
    <>
      <div className={styles.card}>
        <div className={styles.flex}>
          {/* <img className={styles.img} src={post.img} alt="img" /> */}

          <CardMedia
            sx={{
              borderRadius: 2,
              "&:hover": {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            component="img"
            height="100"
            image={post.img}
            alt="img"
          />

          <div className={styles.card_title}>{post.title}</div>

          <div>
            <Link to={`/editPage/${post._id}`}>
              <Button
                sx={{ mr: 1, mb: 1, mt: 2 }}
                size="small"
                variant="outlined"
                startIcon={<EditIcon />}
              >
                edit
              </Button>
            </Link>
            <Button
              sx={{ mb: 1, mt: 2 }}
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                deletePosts(post._id);
                updatePostsToContext()
                //document.location.reload()
              }}
            >
              delete
            </Button>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default EditCard;
