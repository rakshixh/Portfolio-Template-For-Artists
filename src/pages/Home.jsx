import { useState, useEffect } from "react";
import Header from "../components/Header";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      const shouldShow = window.pageYOffset > 300;

      setShowScroll((previousValue) => {
        if (previousValue === shouldShow) {
          return previousValue;
        }

        return shouldShow;
      });
    };

    checkScrollTop();
    window.addEventListener("scroll", checkScrollTop, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  return (
    <div>
      <Header />
      <Portfolio />
      <Footer />
      {showScroll && <ScrollToTop />}
    </div>
  );
}

export default Home;
