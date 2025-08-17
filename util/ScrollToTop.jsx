import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    var e = document.getElementById("homeContentHolder");
    e.scrollTo(0, 0); // Scrolls to top of the page
  }, [pathname]);

  return null;
};

export default ScrollToTop;
