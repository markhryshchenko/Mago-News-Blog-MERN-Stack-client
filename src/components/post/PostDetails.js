import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./post.module.css";
import CardMedia from "@mui/material/CardMedia";
import { LabelsContext, PostsContext } from "../../context/context";
import { getOneLabelOfPost } from "../../services/labelsServices";
import { getOnePost } from "../../services/postsServices";

function PostDetails() {
  const { id } = useParams();
  const { posts } = useContext(PostsContext);
  const [post, setPost] = React.useState({});
  const [label, setLabel] = React.useState([]);
  const [idLabel, setIdLabel] = React.useState(0);

  const { labels } = useContext(LabelsContext);

  useEffect(() => {
    async function fetchPost(id) {
      const data = await getOnePost(id);
      setPost(data);
    }
    fetchPost(id);
  }, [id, idLabel, labels]);
  
  /* 
  useEffect(() => {
    setPost(posts.find((item) => String(id) === item._id));
  }, [id, post.label_id, posts]); */
  /*  useEffect(() => {
    console.log("post", post);
    async function fetchLabel(id) {
      const data = await getOneLabelOfPost(id);
      console.log("label", data);
      //setLabel(data)
    }
    fetchLabel(idLabel);
  }, [id, post.label_id]); */

  return (
    <>
      <div className={styles.content}>
        <div className={styles.head}>
          <h2>{post.title}</h2>
          <div className={styles.label}>{/*  <span>{label.name}</span> */}</div>
        </div>
        <CardMedia component="img" height="415" image={post.img} alt="img" />
        <div className={styles.body}>{post.content}</div>
      </div>
    </>
  );
}

export default PostDetails;
