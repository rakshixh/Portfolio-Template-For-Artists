import React from "react";
import PortfolioCSS from "../css/Portfolio.module.css";
import { motion } from "framer-motion";

const imageModules = import.meta.glob(
  "../assets/images/*.{webp,png,jpg,jpeg,gif}",
  {
    eager: true,
    import: "default",
  },
);

const images = Object.values(imageModules);

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.975,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Portfolio() {
  return (
    <div className={PortfolioCSS.gridContainer}>
      {images.map((src, index) => (
        <ImageWrapper key={index} src={src} index={index} />
      ))}
    </div>
  );
}

function ImageWrapper({ src, index }) {
  return (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      style={{ willChange: "opacity, transform" }}
      className={PortfolioCSS.imageWrapper}
    >
      <img
        src={src}
        alt={`Portfolio ${index + 1}`}
        className={PortfolioCSS.image}
        draggable="false"
        decoding="async"
      />
    </motion.div>
  );
}

export default Portfolio;
