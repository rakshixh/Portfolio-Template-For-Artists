import React from "react";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../css/ScrollToTop.module.css";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.scrollToTop} onClick={scrollToTop}>
      <FontAwesomeIcon icon={faAnglesUp} size="lg" />
    </div>
  );
};

export default ScrollToTop;
