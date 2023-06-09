import styles from "./sxCard.module.css";
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";
function SxCard({post}) {
//console.log("sxCard:",post)
  return (
<Link  to={`/post/${post._id}`}>
      <div className={styles.card}>
        <div className={styles.flex}>
          <img className={styles.img} src={post.img} alt="img" />
          {/* <CardMedia
          component="img"
          height="75"
          image="/i/x00/11.jpg"
          alt="img"
        /> */}
 
          <div className = {styles.content}>
      {post.title}
          </div>
        </div>
      </div>
  </Link>
  );
}

export default SxCard;
