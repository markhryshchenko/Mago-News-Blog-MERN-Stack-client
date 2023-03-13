import styles from "./content.module.css";
import React, { useEffect } from "react";
import { useContext } from "react";
import { PostsContext } from "../../context/context";
import CardContent from "./CardContent";
import { Box, Pagination } from "@mui/material";

function Content() {
  const { posts } = useContext(PostsContext);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [page, setPage] = React.useState(1);
  const [limitPosts, setLimitPosts] = React.useState(6);
  const [countPages, setCountPages] = React.useState(10);
  const [newArr, setNewArr] = React.useState([]);
  useEffect(() => {
    setCountPages(Math.ceil(posts.length / limitPosts));

    let start = page * limitPosts - limitPosts;
    let end = page * limitPosts;
    let arr = posts.slice(start, end);
    setNewArr(arr);
  }, [limitPosts, page, posts, posts.length]);
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.content_grid}>
          {newArr.map((post) => {
            return <CardContent post={post} key={post._id} />;
          })}
        </div>
        <Box sx={{ mx: "auto", width: 200 }}>
          <Pagination
            onChange={handleChange}
            sx={{ mt: 3 }}
            count={countPages}
            variant="outlined"
            color="secondary"
          />
        </Box>
      </div>
    </main>
  );
}

export default Content;
