import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import notFoundImage from "../assets/others/404.svg";

function NotFound() {
  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        <img src={notFoundImage} alt="Not Found" style={styles.image} />
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.message}>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <a href="/" style={styles.homeLink}>
          Go back to Home
        </a>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    padding: "0px",
  },
  image: {
    maxWidth: "100%",
    height: "200px",
  },
  title: {
    fontSize: "2.5rem",
    margin: "20px 0",
    color: "lightgrey",
  },
  message: {
    fontSize: "1.25rem",
    color: "grey",
    marginBottom: "20px",
  },
  homeLink: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginTop: "20px",
  },
};

export default NotFound;
