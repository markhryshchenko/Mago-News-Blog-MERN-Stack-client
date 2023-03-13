import styles from "./content.module.css";
import CardMedia from "@mui/material/CardMedia";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LabelsContext } from "../../context/context";

function CardContent({ post }) {
  const [label, setLabel] = React.useState([]);
  const { labels } = useContext(LabelsContext);

  useEffect(() => {
    const id = post.label_id;
    let res = labels.find((item) => String(item._id) === id);
    setLabel(res);
  }, [label.name, labels, post.label_id]);

  return (
    <div>
      <Link value={post._id} to={`/post/${post._id}`}>
        <div className={styles.link}>
          <CardMedia
            component="img"
            height="228"
            image={post.img}
            alt="img"
            sx={{
              "&:hover": {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
          <div className={styles.card__content}>
            <div className={styles.label}>
              <span>{label.name}</span>
            </div>
            <div className={styles.title}>{post.title}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardContent;
