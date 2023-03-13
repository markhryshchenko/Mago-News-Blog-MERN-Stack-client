import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPostsByFilter } from "../../services/postsServices";
import styles from "./aside.module.css";

function LabelLinks({ label }) {
  //const [labels, setLabels] = React.useState([]);
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    async function fetchPostsByLabel() {
      const id = label._id;
      const data = await getPostsByFilter(id);
      setPosts(data);
    }
    fetchPostsByLabel();
  }, [label._id]);

  //console.log("posts: ", posts.length);
  return (
    <Link className={styles.labels} to={`/label/${label._id}`}>
      {label.name}
      <span className={styles.counter}>{posts.length}</span>
    </Link>
  );
}

export default LabelLinks;
