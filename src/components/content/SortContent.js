import styles from "./content.module.css";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Aside from "../aside/Aside";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import { LabelsContext} from "../../context/context";
import CardContent from "./CardContent";
import { getPostsByFilter } from "../../services/postsServices";

function SortContent() {
  const { id } = useParams();
 
  const { labels } = useContext(LabelsContext);
  const [label, setLabels] = React.useState([]);
  const [sortPosts, setPosts] = React.useState([]);
  useEffect(() => {
    setLabels(labels.find((item) => String(item._id) === id));
  }, [id, labels]);

  useEffect(() => {
    async function fetchPosts(id) {
      const data = await getPostsByFilter(id);
      setPosts(data);
    }
    fetchPosts(id);
  }, [id]);
  return (
    <div className="App">
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.label}>
            {labels.map((item) => {
              return (
                <Link className={styles.btn_sort} key={item._id} to={`/label/${item._id}`}>
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className={styles.content_grid}>
            {sortPosts.map((post) => {
              return <CardContent post={post} key={post._id} />;
            })}
          </div>
        </div>
        <Aside />
      </main>
      <Footer />
    </div>
  );
}

export default SortContent;
