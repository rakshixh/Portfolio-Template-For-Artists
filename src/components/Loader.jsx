import React from "react";
import styles from "../css/Loader.module.css";

function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
      <p className={styles.text}>Loading portfolio...</p>
    </div>
  );
}

export default Loader;
