

import { Link } from "react-router-dom";
import styles from "./footer.module.css";

function LabelButtons({label}) {
  
  return (
    <li>
  
    <Link  className={styles.label}  to={`/label/${label._id}`}>
     {label.name}
    </Link>
  </li>
  );
}

export default LabelButtons;
